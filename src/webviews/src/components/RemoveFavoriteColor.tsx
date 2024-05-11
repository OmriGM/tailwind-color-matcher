import { TrashIcon } from '@radix-ui/react-icons';
import { useColors } from '../hooks/useColors';
import { useSendAnalytics } from '../hooks/useAnalytics';
import { ColorMatch } from '../types';

export const RemoveFavoriteColor = ({ color }: { color: ColorMatch }) => {
  const { removeColor } = useColors();
  const { sendAnalytics } = useSendAnalytics();

  return (
    <div className={'flex items-center gap-1'}>
      <TrashIcon
        className={`w-5 h-6 cursor-pointer`}
        onClick={() => {
          sendAnalytics({
            eventName: 'Remove color from favorite',
            eventProps: {
              color: color,
              using: 'favorites_list',
            },
          });
          removeColor(color);
        }}
      />
    </div>
  );
};
