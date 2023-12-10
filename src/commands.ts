import * as vscode from 'vscode';
import { validateHexColor } from './tailwindColorMaps/utils';
import { CommandTypes, TailwindNearestColorCommand } from './types';
import { TailwindNearestColorProvider } from './NearestColorViewProvider';

export const commands: Record<CommandTypes, TailwindNearestColorCommand> = {
  matchColor: {
    command: 'tailwind-nearest-color.matchColor',
    callback: async (webviewProvider: TailwindNearestColorProvider) => {
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
    command: 'tailwind-nearest-color.setTailwindVersion',
    callback: async () => {
      const version = await vscode.window.showQuickPick(['v2', 'v1', 'v3']);
      vscode.window.showInformationMessage(
        'Tailwind version set to ' + version,
      );
    },
  },
};
