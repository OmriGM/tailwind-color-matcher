import * as nearestColor from 'nearest-color';
import { useEffect, useState } from 'react';
import { flattenColors, validateHexColor } from './colorUtils';
import { ColorBox } from './components/ColorBox';
import { ColorInput } from './components/ColorInput';
import { FavoriteColors } from './components/FavoriteColorsList';
import { useMessageBroker } from './hooks/useMessageBroker';
import { ColorProvider } from './providers/colorProvider';
import { ColorMatch } from './types';
import { colors } from './v3';
import { useSendAnalytics } from './hooks/useAnalytics';

const App = () => {
  const { postError } = useMessageBroker();
  const { sendAnalytics } = useSendAnalytics();
  const [colorMatch, setColorMatch] = useState<ColorMatch>();
  const [hexColor, setHexColor] = useState('#2f22f2');
  const mappedColors = flattenColors(colors);
  const getNearestColor = nearestColor.from(mappedColors);

  // listen to events from the webview
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const message = event.data; // The JSON data our extension sent
      switch (message.command) {
        case 'setColor':
          sendAnalytics({
            eventName: 'Set color from command pallette',
            eventProps: {
              color: message.value,
            },
          });
          setHexColor(message.value);
          break;
        default:
          break;
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  useEffect(() => {
    if (!hexColor || !validateHexColor(hexColor)) return;

    const color: ColorMatch | null = getNearestColor(hexColor);
    if (!color) {
      sendAnalytics({
        eventName: 'Translate nearest color',
        eventProps: {
          hexColor,
        },
      });
      postError("Couldn't find a color match");
      return;
    }
    setColorMatch(color);
  }, [hexColor]);

  return (
    <ColorProvider>
      <div
        className={
          'flex flex-col mx-auto gap-6 p-4 w-screen bg-vscode-panel-background h-full'
        }
      >
        <ColorBox colorMatch={colorMatch} />
        <ColorInput
          hex={hexColor}
          onChange={(color: string) => {
            setHexColor(color);
          }}
        />
        <FavoriteColors />
      </div>
    </ColorProvider>
  );
};

export default App;
