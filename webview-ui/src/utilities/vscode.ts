// webview-ui/src/utilities/vscode.ts
import type { WebviewApi } from "vscode-webview";

/**
 * A utility wrapper around the acquireVsCodeApi() function, which enables
 * message passing between the webview and the extension.
 */
class VSCodeAPIWrapper {
  private readonly vscodeApi: WebviewApi<unknown> | undefined;

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
  public postMessage(message: unknown) {
    if (this.vscodeApi) {
      this.vscodeApi.postMessage(message);
    }
  }
}

// Export a singleton instance of the wrapper.
export const vscode = new VSCodeAPIWrapper();