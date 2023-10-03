import * as vscode from 'vscode';
import { validateHexColor } from './tailwindColorMaps/utils';
import { getWebviewContent } from './webviewPanel';
import { CommandTypes, ColorMatch, TailwindNearestColorCommand } from './types';

export const commands: Record<CommandTypes, TailwindNearestColorCommand> = {
  matchColor: {
    command: 'tailwind-nearest-color.matchColor',
    callback: async (
      context: vscode.ExtensionContext,
      getNearestColor: (color: string) => ColorMatch,
    ) => {
      const value = await vscode.window.showInputBox({
        placeHolder: 'Enter a color',
        value: '#',
        valueSelection: [1, 1],
        validateInput: (hex) => {
          if (!validateHexColor(hex)) {
            return 'Please enter a valid hex color';
          }
        },
      });

      if (!value) {
        return;
      }

      const color: ColorMatch = getNearestColor(value);
      vscode.env.clipboard.writeText(color.name);
      vscode.window.showInformationMessage(
        color.name + ' copied to clipboard!',
      );

      const panel = vscode.window.createWebviewPanel(
        'colorDisplay',
        'Tailwind Color Matcher',
        vscode.ViewColumn.Beside,
        {
          // Enable javascript in the webview
          enableScripts: true,
        },
      );
      panel.webview.html = getWebviewContent(
        panel.webview,
        context.extensionUri,
        value,
        color,
      );
    },
  },
  setTailwindVersion: {
    command: 'tailwind-nearest-color.setTailwindVersion',
    callback: async () => {
      const version = await vscode.window.showQuickPick(['v2', 'v1']);
      vscode.window.showInformationMessage(
        'Tailwind version set to ' + version,
      );
    },
  },
};
