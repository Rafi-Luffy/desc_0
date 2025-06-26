// src/extension.ts
import * as vscode from 'vscode';
import { getWebviewContent } from './getWebviewContent';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "ai-chat-assistant" is now active!');

    // Command to set the API key
    const setApiKeyCommand = vscode.commands.registerCommand('ai-chat-assistant.setApiKey', async () => {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your Google Gemini API Key (Get it from: https://makersuite.google.com/app/apikey)',
            password: true,
            ignoreFocusOut: true,
            placeHolder: 'AIzaSy...'
        });

        if (apiKey) {
            await context.secrets.store('geminiApiKey', apiKey);
            vscode.window.showInformationMessage('Gemini API Key stored successfully. You can now start chatting!');
        }
    });

    // Command to generate code
    const generateCodeCommand = vscode.commands.registerCommand('ai-chat-assistant.generateCode', async () => {
        const prompt = await vscode.window.showInputBox({
            prompt: 'Describe the code you want to generate',
            placeHolder: 'e.g., Create a React component for a todo list'
        });

        if (prompt) {
            const provider = new ChatViewProvider(context.extensionUri, context);
            await provider.generateCodeFromPrompt(prompt);
        }
    });

    context.subscriptions.push(setApiKeyCommand, generateCodeCommand);

    // Register the WebviewViewProvider
    const provider = new ChatViewProvider(context.extensionUri, context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(ChatViewProvider.viewType, provider)
    );
}

class ChatViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'aiChatAssistantView';

    private _view?: vscode.WebviewView;
    private _ai?: GoogleGenerativeAI;
    private _apiKey?: string;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _context: vscode.ExtensionContext
    ) {
        this._initAI();
    }

    private async _initAI() {
        this._apiKey = await this._context.secrets.get('geminiApiKey');
        if (this._apiKey) {
            this._ai = new GoogleGenerativeAI(this._apiKey);
        }
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'out')]
        };

        webviewView.webview.html = getWebviewContent(webviewView.webview, this._extensionUri);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'get-files': {
                    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
                    const fileList = files.map(file => vscode.workspace.asRelativePath(file));
                    webviewView.webview.postMessage({
                        type: 'file-list',
                        files: fileList
                    });
                    break;
                }
                case 'get-workspace-context': {
                    const workspaceContext = await this.getWorkspaceContext();
                    webviewView.webview.postMessage({
                        type: 'workspace-context',
                        context: workspaceContext
                    });
                    break;
                }
                case 'user-message': {
                    await this.handleUserMessage(data.message);
                    break;
                }
                case 'generate-code': {
                    await this.generateCodeFromPrompt(data.prompt, data.language);
                    break;
                }
                case 'insert-code': {
                    await this.insertCodeIntoEditor(data.code, data.language);
                    break;
                }
                case 'create-file': {
                    await this.createNewFile(data.filename, data.content);
                    break;
                }
                case 'show-error': {
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }

    private async getWorkspaceContext(): Promise<string> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return 'No workspace folder is open.';
        }

        let context = `Workspace: ${workspaceFolders[0].name}\n\n`;
        
        // Get currently open files
        const openFiles = vscode.workspace.textDocuments
            .filter(doc => !doc.isUntitled && doc.uri.scheme === 'file')
            .map(doc => vscode.workspace.asRelativePath(doc.uri));
        
        if (openFiles.length > 0) {
            context += `Currently open files:\n${openFiles.map(f => `- ${f}`).join('\n')}\n\n`;
        }

        // Get active editor content
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const relativePath = vscode.workspace.asRelativePath(activeEditor.document.uri);
            const selection = activeEditor.selection;
            const selectedText = activeEditor.document.getText(selection);
            
            context += `Active file: ${relativePath}\n`;
            if (selectedText) {
                context += `Selected text:\n\`\`\`\n${selectedText}\n\`\`\`\n`;
            }
        }

        return context;
    }

    public async generateCodeFromPrompt(prompt: string, language?: string): Promise<void> {
        if (!this._view) return;

        await this._initAI();
        if (!this._ai) {
            this._view.webview.postMessage({ 
                type: 'error', 
                value: 'API Key not set. Please run the "AI Chat: Set Gemini API Key" command.' 
            });
            return;
        }

        this._view.webview.postMessage({ type: 'ai-thinking' });

        try {
            const model = this._ai.getGenerativeModel({ model: "gemini-1.5-pro" });
            
            const workspaceContext = await this.getWorkspaceContext();
            const fullPrompt = `${workspaceContext}\n\nGenerate ${language ? language : 'code'} for: ${prompt}\n\nProvide clean, well-commented code with explanations.`;

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            this._view.webview.postMessage({ 
                type: 'code-generated', 
                value: text,
                prompt: prompt
            });

        } catch (error: any) {
            console.error("Error generating code:", error);
            this._view.webview.postMessage({ 
                type: 'error', 
                value: `Error generating code: ${error.message}` 
            });
        }
    }

    private async insertCodeIntoEditor(code: string, language?: string): Promise<void> {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showWarningMessage('No active editor to insert code into.');
            return;
        }

        const selection = activeEditor.selection;
        await activeEditor.edit(editBuilder => {
            editBuilder.replace(selection, code);
        });

        vscode.window.showInformationMessage('Code inserted successfully!');
    }

    private async createNewFile(filename: string, content: string): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder is open.');
            return;
        }

        const filePath = path.join(workspaceFolders[0].uri.fsPath, filename);
        
        try {
            await fs.promises.writeFile(filePath, content, 'utf8');
            const document = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(document);
            vscode.window.showInformationMessage(`File ${filename} created successfully!`);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Error creating file: ${error.message}`);
        }
    }

    private async handleUserMessage(message: { role: string; text: string; files: string[]; images?: string[] }) {
        if (!this._view) return;

        await this._initAI();
        if (!this._ai) {
            this._view.webview.postMessage({ 
                type: 'error', 
                value: 'API Key not set. Please run the "AI Chat: Set Gemini API Key" command from the command palette.' 
            });
            return;
        }

        this._view.webview.postMessage({ type: 'ai-thinking' });

        try {
            const model = this._ai.getGenerativeModel({ model: "gemini-1.5-pro" });
            let fullPrompt = message.text;

            // Add workspace context
            const workspaceContext = await this.getWorkspaceContext();
            fullPrompt = `${workspaceContext}\n\n--- USER MESSAGE ---\n${message.text}`;

            // Handle file attachments
            if (message.files && message.files.length > 0) {
                let fileContext = "\n\n--- ATTACHED FILES ---\n";
                for (const filePath of message.files) {
                    try {
                        const fileUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, filePath);
                        const fileContent = await vscode.workspace.fs.readFile(fileUri);
                        const fileExtension = path.extname(filePath);
                        fileContext += `\n--- File: ${filePath} ---\n\`\`\`${this.getLanguageFromExtension(fileExtension)}\n${fileContent.toString()}\n\`\`\`\n`;
                    } catch (error) {
                        console.error(`Error reading file ${filePath}:`, error);
                        fileContext += `\n--- Could not read file: ${filePath} ---\n`;
                    }
                }
                fullPrompt += fileContext;
            }

            // Handle image attachments (if any)
            if (message.images && message.images.length > 0) {
                fullPrompt += "\n\n--- ATTACHED IMAGES ---\n";
                for (const imagePath of message.images) {
                    fullPrompt += `Image: ${imagePath}\n`;
                }
            }

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            this._view.webview.postMessage({ type: 'ai-response', value: text });

        } catch (error: any) {
            console.error("Error with Gemini API:", error);
            let friendlyErrorMessage = error.message || "An unknown error occurred with the AI model.";
            if (error.message.includes("API_KEY_INVALID")) {
                friendlyErrorMessage = "The provided API Key is invalid. Please set a valid key using the command palette.";
            }
            this._view.webview.postMessage({ type: 'error', value: `Error: ${friendlyErrorMessage}` });
        }
    }

    private getLanguageFromExtension(extension: string): string {
        const languageMap: { [key: string]: string } = {
            '.js': 'javascript',
            '.jsx': 'jsx',
            '.ts': 'typescript',
            '.tsx': 'tsx',
            '.py': 'python',
            '.java': 'java',
            '.cpp': 'cpp',
            '.c': 'c',
            '.cs': 'csharp',
            '.php': 'php',
            '.rb': 'ruby',
            '.go': 'go',
            '.rs': 'rust',
            '.html': 'html',
            '.css': 'css',
            '.scss': 'scss',
            '.json': 'json',
            '.xml': 'xml',
            '.md': 'markdown',
            '.sql': 'sql',
            '.sh': 'bash',
            '.yml': 'yaml',
            '.yaml': 'yaml'
        };
        return languageMap[extension.toLowerCase()] || '';
    }
}

// This method is called when your extension is deactivated
export function deactivate() { }