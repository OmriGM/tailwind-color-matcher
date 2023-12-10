import * as vscode from 'vscode';

// TODO: Show history of colors matched
// TODO: Add color picker
// TODO: Use React js
// TODO: Manage tailwind versions color maps

export class TailwindColorMatcherProvider
  implements vscode.WebviewViewProvider
{
  private _view?: vscode.WebviewView;
  public static readonly viewType = 'tailwindColorMatcherView';

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true, // Enable JavaScript in the webview
      localResourceRoots: [this.context.extensionUri], // Restrict the webview to only load resources from the `out` directory
    };
    webviewView.webview.html = this._getWebviewContent(webviewView.webview);
    this._setWebviewMessageListener(webviewView);
  }

  private _setWebviewMessageListener = (webviewView: vscode.WebviewView) => {
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case 'copyToClipboard':
          vscode.env.clipboard.writeText(message.value);
          vscode.window.showInformationMessage(
            message.value + ' copied to clipboard!',
          );
          return;
        case 'error':
          vscode.window.showErrorMessage(message.value);
          return;
      }
    });
  };

  setColor = (color: string) => {
    vscode.commands.executeCommand('tailwindColorMatcherView.focus');
    this._view?.webview.postMessage({
      command: 'setColor',
      value: color,
    });
  };

  private _getWebviewContent = (webview: vscode.Webview) => {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.js'),
    );
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'reset.css'),
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.css'),
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">

				<link href="${styleMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
          const tsvscode = acquireVsCodeApi();
        </script>
			</head>
			<body>
        <div id="root"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  };
}
const getNonce = () => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
