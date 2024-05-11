import tinyColor from 'tinycolor2';
import { useSendAnalytics } from '../hooks/useAnalytics';
import { useCopy } from '../hooks/useCopy';
import { ColorMatch } from '../types';
import { ColorItemTooltip } from './ColorItemTooltip';
import { RemoveFavoriteColor } from './RemoveFavoriteColor';

type FavoriteColorItemProps = { color: ColorMatch };

export const FavoriteColorItem = ({ color }: FavoriteColorItemProps) => {
  const { copy } = useCopy();
  const { sendAnalytics } = useSendAnalytics();
  const isLightColor = tinyColor(color?.value).isLight();

  return (
    <div className={'flex items-center gap-3 animate-fadeIn w-full'}>
      <RemoveFavoriteColor color={color} />
      <div className={'w-full'}>
        <ColorItemTooltip text={'Copy'}>
          <div
            key={color.name}
            style={{ background: color.value }}
            onClick={() => {
              sendAnalytics({
                eventName: 'Copy color',
                eventProps: {
                  color: color,
                  using: 'favorites_list',
                },
              });
              copy(color.name);
            }}
            className={`h-10 rounded-md flex justify-center gap-2 items-center cursor-pointer font-semibold ${
              isLightColor ? 'text-black' : 'text-white'
            }`}
          >
            <span>{color.name}</span>
            <span className={'text-xs font-light'}>{color.value}</span>
          </div>
        </ColorItemTooltip>
      </div>
    </div>
  );
};
