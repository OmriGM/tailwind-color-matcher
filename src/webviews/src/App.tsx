import { useEffect, useState } from 'react';
import ColorBox from './components/ColorBox';
import ColorInput from './components/ColorInput';
import { useColorMatch } from './hooks/useColorMatch';
import * as nearestColor from 'nearest-color';
import { flattenColors } from './colorUtils';
import { colors as colorsV2 } from './v2';

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type ColorMatch = {
  name: string;
  value: string;
  rgb: RGB;
};

const useVsCodeBridge = () => {
  return {
    postMessage: ({ command, value }: { command: string; value: unknown }) => {
      tsvscode.postMessage({
        command,
        value,
      });
    },
    postError: (error: string) => {
      tsvscode.postMessage({
        command: 'error',
        value: error,
      });
    },
  };
};
const App = () => {
  const { colorMatchObj } = useColorMatch();
  const { postMessage, postError } = useVsCodeBridge();
  const [currentColor, setCurrentColor] = useState('');
  const mappedColors = flattenColors(colorsV2);
  const getNearestColor = nearestColor.from(mappedColors);

  // listen to events from the webview
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const message = event.data; // The JSON data our extension sent
      switch (message.command) {
        case 'setColor':
          setCurrentColor(message.value);
          break;
        default:
          break;
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  useEffect(() => {
    if (!currentColor) return;

    const color: ColorMatch | null = getNearestColor(currentColor);
    if (!color) {
      postError("Couldn't find a color match");
      return;
    }

    postMessage({
      command: 'copyToClipboard',
      value: color.name,
    });
  }, [currentColor]);

  return (
    <div className={'flex w-full flex-col mx-auto'}>
      <h1>Entered Color:</h1>
      <ColorInput />
      <h1>Tailwind color class:</h1>
      <span>{currentColor}</span>
      <ColorBox colorMatchObj={colorMatchObj} />
      {/* <ColorHistory colorHistory={colorHistory} /> */}
    </div>
  );
};

export default App;
