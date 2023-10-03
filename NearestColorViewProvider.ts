import * as vscode from 'vscode';

// TODO: Show history of colors matched
// TODO: Add color picker
// TODO: Use React js
// TODO: Manage tailwind versions color maps

export class TailwindNearestColorProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType =
    'tailwindNearestColor.tailwindNearestColorView';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken,
  ): void | Thenable<void> {
    webviewView.webview.options = {
      // Enable JavaScript in the webview
      enableScripts: true,
      // Restrict the webview to only load resources from the `out` directory
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'out')],
    };

    // Set the HTML content that will fill the webview view
    webviewView.webview.html = this._getWebviewContent(
      webviewView.webview,
      this._extensionUri,
    );

    // Sets up an event listener to listen for messages passed from the webview view context
    // and executes code based on the message that is recieved
    // this._setWebviewMessageListener(webviewView);
  }

  _getWebviewContent = (
    webview: vscode.Webview,
    extensionUri: vscode.Uri,
    userColor?: string,
    newColor?: string,
  ) => {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Show Colors</title>
            </head>
            <body>
                <h1>Entered Color:</h1>
                <div style="width: 100px; height: 100px; background-color: ${
                  userColor || '#FFF'
                };"></div>
                <h1>New Color:</h1>
                <div style="width: 100px; height: 100px; background-color: ${
                  newColor || '#FFF'
                };"></div>
            </body>
            </html>
        `;
  };
}
