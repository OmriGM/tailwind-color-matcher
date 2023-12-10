import * as vscode from 'vscode';
import { validateHexColor } from './tailwindColorMaps/utils';
import { CommandTypes, TailwindColorMatcherCommand } from './types';
import { TailwindColorMatcherProvider } from './colorMatcherViewProvider';

export const commands: Record<CommandTypes, TailwindColorMatcherCommand> = {
  matchColor: {
    command: 'tailwind-color-matcher.matchColor',
    callback: async (webviewProvider: TailwindColorMatcherProvider) => {
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
      webviewProvider.setColor(value);
    },
  },
  setTailwindVersion: {
    command: 'tailwind-color-matcher.setTailwindVersion',
    callback: async () => {
      const version = await vscode.window.showQuickPick(['v2', 'v1', 'v3']);
      vscode.window.showInformationMessage(
        'Tailwind version set to ' + version,
      );
    },
  },
};
