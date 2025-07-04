"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// src/extension.ts
const vscode = require("vscode");
const getWebviewContent_1 = require("./getWebviewContent");
const generative_ai_1 = require("@google/generative-ai");
// This method is called when your extension is activated
function activate(context) {
    console.log('Congratulations, your extension "ai-chat-assistant" is now active!');
    // Command to set the API key
    const setApiKeyCommand = vscode.commands.registerCommand('ai-chat-assistant.setApiKey', async () => {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your Google Gemini API Key',
            password: true,
            ignoreFocusOut: true,
        });
        if (apiKey) {
            await context.secrets.store('geminiApiKey', apiKey);
            vscode.window.showInformationMessage('Gemini API Key stored successfully.');
        }
    });
    context.subscriptions.push(setApiKeyCommand);
    // Register the WebviewViewProvider
    const provider = new ChatViewProvider(context.extensionUri, context);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(ChatViewProvider.viewType, provider));
}
class ChatViewProvider {
    constructor(_extensionUri, _context) {
        this._extensionUri = _extensionUri;
        this._context = _context;
        this._initAI();
    }
    async _initAI() {
        this._apiKey = await this._context.secrets.get('geminiApiKey');
        if (this._apiKey) {
            this._ai = new generative_ai_1.GoogleGenerativeAI(this._apiKey);
        }
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'out')]
        };
        webviewView.webview.html = (0, getWebviewContent_1.getWebviewContent)(webviewView.webview, this._extensionUri);
        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'get-files': {
                    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
                    webviewView.webview.postMessage({
                        type: 'file-list',
                        files: files.map(file => vscode.workspace.asRelativePath(file))
                    });
                    break;
                }
                case 'user-message': {
                    if (!this._ai) {
                        this._apiKey = await this._context.secrets.get('geminiApiKey');
                        if (!this._apiKey) {
                            webviewView.webview.postMessage({ type: 'error', value: 'API Key not set. Please run the "AI Chat: Set Gemini API Key" command.' });
                            return;
                        }
                        this._ai = new generative_ai_1.GoogleGenerativeAI(this._apiKey);
                    }
                    this.handleUserMessage(data.message);
                    break;
                }
                case 'show-error': {
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }
    // src/extension.ts
    // ... inside the ChatViewProvider class ...
    async handleUserMessage(message) {
        if (!this._view) {
            return;
        }
        // --- START OF THE FIX ---
        // Check if the AI is initialized. If not, try to initialize it.
        // This is a robust way to handle the first message or any case where initialization failed.
        if (!this._ai) {
            this._apiKey = await this._context.secrets.get('geminiApiKey');
            if (!this._apiKey) {
                // If the key is still not found, post an error and stop.
                this._view.webview.postMessage({ type: 'error', value: 'API Key not set. Please run the "AI Chat: Set Gemini API Key" command from the command palette.' });
                return;
            }
            // If the key was found, create the AI instance.
            this._ai = new generative_ai_1.GoogleGenerativeAI(this._apiKey);
        }
        // --- END OF THE FIX ---
        this._view.webview.postMessage({ type: 'ai-thinking' });
        try {
            const model = this._ai.getGenerativeModel({ model: "gemini-1.0-pro" }, { apiVersion: "v1" });
            let fullPrompt = message.text;
            // Handle file attachments
            if (message.files && message.files.length > 0) {
                let fileContext = "\n\n--- CONTEXT FROM ATTACHED FILES ---\n";
                for (const filePath of message.files) {
                    try {
                        const fileUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, filePath);
                        const fileContent = await vscode.workspace.fs.readFile(fileUri);
                        fileContext += `\n--- File: ${filePath} ---\n\`\`\`\n${fileContent.toString()}\n\`\`\`\n`;
                    }
                    catch (error) {
                        console.error(`Error reading file ${filePath}:`, error);
                        fileContext += `\n--- Could not read file: ${filePath} ---\n`;
                    }
                }
                fullPrompt = fileContext + "\n--- USER PROMPT ---\n" + message.text;
            }
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();
            this._view.webview.postMessage({ type: 'ai-response', value: text });
        }
        catch (error) {
            console.error("Error with Gemini API:", error);
            // We can make the error message more user-friendly
            let friendlyErrorMessage = error.message || "An unknown error occurred with the AI model.";
            if (error.message.includes("API_KEY_INVALID")) {
                friendlyErrorMessage = "The provided API Key is invalid. Please set a valid key using the command palette.";
            }
            this._view.webview.postMessage({ type: 'error', value: `Error: ${friendlyErrorMessage}` });
        }
    }
}
ChatViewProvider.viewType = 'aiChatAssistantView';
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map