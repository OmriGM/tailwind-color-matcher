import * as vscode from 'vscode';
import { TailwindColorMatcherProvider } from './colorMatcherViewProvider';
import { commands } from './commands';
import { mixpanelService } from './mixpanel';

const subscribeCommands = (context: vscode.ExtensionContext) => {
  const provider = new TailwindColorMatcherProvider(context);
  context.subscriptions.push(
    vscode.commands.registerCommand(commands.matchColor.command, () =>
      commands.matchColor.callback(provider),
    ),
    vscode.commands.registerCommand(
      commands.setTailwindVersion.command,
      commands.setTailwindVersion.callback,
    ),
    vscode.window.registerWebviewViewProvider(
      TailwindColorMatcherProvider.viewType,
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
  mixpanelService.init();
  subscribeCommands(context);
};
export function deactivate() {}
