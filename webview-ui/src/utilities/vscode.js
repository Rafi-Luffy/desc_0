/**
 * A utility wrapper around the acquireVsCodeApi() function, which enables
 * message passing between the webview and the extension.
 */
class VSCodeAPIWrapper {
    vscodeApi;
    constructor() {
        // Check if the acquireVsCodeApi function exists in the current context.
        // It only exists in a webview environment.
        if (typeof acquireVsCodeApi === "function") {
            this.vscodeApi = acquireVsCodeApi();
        }
    }
    /**
     * Post a message to the extension.
     * @param message The message to send.
     */
    postMessage(message) {
        if (this.vscodeApi) {
            this.vscodeApi.postMessage(message);
        }
    }
}
// Export a singleton instance of the wrapper.
export const vscode = new VSCodeAPIWrapper();
//# sourceMappingURL=vscode.js.map