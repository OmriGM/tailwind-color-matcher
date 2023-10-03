import { getNonce } from './tailwindColorMaps/utils/getNonce';
import { ColorMatch } from './types';
import * as vscode from 'vscode';

export const getWebviewContent = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  userColor: string,
  colorMatchObj: ColorMatch,
) => {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'compiled/main.js'),
  );

  const cssUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'compiled/main.css'),
  );

  // Use a nonce to only allow specific scripts to be run
  const nonce = getNonce();

  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${cssUri}" rel="stylesheet">
            <title>Tailwind Nearest Color</title>
            <script nonce="${nonce}">
                const tsvscode = acquireVsCodeApi();
            </script>
        </head>
        <body style="padding: 0; overflow-x: hidden;">
            <div id="root"></div>
        </body>
        <script type="module" src="${scriptUri}" nonce="${nonce}"></script>
    </html>`;
};

// <body>
//     <h1>Entered Color:</h1>
//     <div style="display: flex;de flex-direction: column;">
//         <input value=${userColor}></input>
//         <div style="width: 44px; height: 34px; background-color: ${userColor}; border: 1px solid lightgray;"></div>
//     </div>
//     <h1>Tailwind color class:</h1>
//     <div style="display: flex; flex-direction: column;">
//         <div style="width: 44px; height: 34px; background-color: ${colorMatchObj.value}; border: 1px solid lightgray;"></div>
//             <span>${colorMatchObj.name}</span>
//             <span>${colorMatchObj.value}</span>
//         </div>
//     <div id="color-history">
//         <h1>Color History:</h1>
//         <ul id="color-history-list">
//             <li>${colorMatchObj.name}</li>
//             <li>Color 2</li>
//         </ul>
//     </div>
// </body>
