import * as vscode from 'vscode';
import { flattenColors } from './tailwindColorMaps/utils';
import { colors as colorsV2 } from './tailwindColorMaps/v2';
import * as nearestColor from 'nearest-color';

export function activate(context: vscode.ExtensionContext) {
  const mappedColors = flattenColors(colorsV2);
  const getNearestColor = nearestColor.from(mappedColors);

  let disposable = vscode.commands.registerCommand(
    'tailwind-color-matcher.matchColor',
    () => {
      const color = getNearestColor('#123456');
      vscode.window.showInformationMessage(color.name);
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
