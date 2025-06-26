// src/getWebviewContent.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
    // Path to the built webview UI
    const webviewUiBuildPath = path.join(extensionUri.fsPath, 'out', 'webview-ui');

    // Read the index.html file from the build output
    let indexHtml = fs.readFileSync(path.join(webviewUiBuildPath, 'index.html'), 'utf-8');

    // Update resource paths to work in the webview
    indexHtml = indexHtml.replace(/<(script|link|img)([^>]+)src="([^"]+)"/g,
        (match, tag, a, src) => {
            const resourcePath = vscode.Uri.file(path.resolve(webviewUiBuildPath, src.startsWith('/') ? src.substring(1) : src));
            const webviewUri = webview.asWebviewUri(resourcePath);
            return `<${tag}${a}src="${webviewUri}"`;
        }
    ).replace(/<(script|link|img)([^>]+)href="([^"]+)"/g,
        (match, tag, a, href) => {
            const resourcePath = vscode.Uri.file(path.resolve(webviewUiBuildPath, href.startsWith('/') ? href.substring(1) : href));
            const webviewUri = webview.asWebviewUri(resourcePath);
            return `<${tag}${a}href="${webviewUri}"`;
        }
    );

    return indexHtml;
}