import * as nearestColor from 'nearest-color';
import * as vscode from 'vscode';
import { commands } from './commands';
import { flattenColors } from './tailwindColorMaps/utils';
import { colors as colorsV2 } from './tailwindColorMaps/v2';
import { TailwindNearestColorProvider } from '../NearestColorViewProvider';

const mappedColors = flattenColors(colorsV2);
const getNearestColor = nearestColor.from(mappedColors);

const subscribeCommands = (context: vscode.ExtensionContext) => {
  //   const provider = new TailwindNearestColorProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.commands.registerCommand(commands.matchColor.command, () =>
      commands.matchColor.callback(context, getNearestColor),
    ),
    vscode.commands.registerCommand(
      commands.setTailwindVersion.command,
      commands.setTailwindVersion.callback,
    ),
    // vscode.window.registerWebviewViewProvid//er(
    //   TailwindNearestColorProvider.viewType,
    //   provider,
    // ),
  );
};

export const activate = (context: vscode.ExtensionContext) => {
  subscribeCommands(context);
};
export function deactivate() {}
