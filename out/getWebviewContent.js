"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = getWebviewContent;
// src/getWebviewContent.ts
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function getWebviewContent(webview, extensionUri) {
    // Path to the built webview UI
    const webviewUiBuildPath = path.join(extensionUri.fsPath, 'out', 'webview-ui');
    // Read the index.html file from the build output
    let indexHtml = fs.readFileSync(path.join(webviewUiBuildPath, 'index.html'), 'utf-8');
    // Update resource paths to work in the webview
    indexHtml = indexHtml.replace(/<(script|link|img)([^>]+)src="([^"]+)"/g, (match, tag, a, src) => {
        const resourcePath = vscode.Uri.file(path.resolve(webviewUiBuildPath, src.startsWith('/') ? src.substring(1) : src));
        const webviewUri = webview.asWebviewUri(resourcePath);
        return `<${tag}${a}src="${webviewUri}"`;
    }).replace(/<(script|link|img)([^>]+)href="([^"]+)"/g, (match, tag, a, href) => {
        const resourcePath = vscode.Uri.file(path.resolve(webviewUiBuildPath, href.startsWith('/') ? href.substring(1) : href));
        const webviewUri = webview.asWebviewUri(resourcePath);
        return `<${tag}${a}href="${webviewUri}"`;
    });
    return indexHtml;
}
//# sourceMappingURL=getWebviewContent.js.map