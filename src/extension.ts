import * as vscode from 'vscode';
import { commands } from './commands';
import { flattenColors } from './tailwindColorMaps/utils';
import { colors as colorsV2 } from './tailwindColorMaps/v2';
import { TailwindNearestColorProvider } from './NearestColorViewProvider';

const subscribeCommands = (context: vscode.ExtensionContext) => {
  const provider = new TailwindNearestColorProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.commands.registerCommand(commands.matchColor.command, () =>
      commands.matchColor.callback(context, provider),
    ),
    vscode.commands.registerCommand(
      commands.setTailwindVersion.command,
      commands.setTailwindVersion.callback,
    ),
    vscode.window.registerWebviewViewProvider(
      TailwindNearestColorProvider.viewType,
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      },
    ),
  );
};

export const activate = (context: vscode.ExtensionContext) => {
  subscribeCommands(context);
};
export function deactivate() {}
