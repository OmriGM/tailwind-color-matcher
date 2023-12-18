import { TrashIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import tinyColor from 'tinycolor2';
import { useSendAnalytics } from '../hooks/useAnalytics';
import { useColors } from '../hooks/useColors';
import { useCopy } from '../hooks/useCopy';
import { ColorMatch } from '../types';

const iconClassName = `w-5 h-6 cursor-pointer`;
const tooltipContentClassName =
  'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-stone-700 select-none rounded-[4px] bg-zinc-200 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]';

type FavoriteColorItemProps = { color: ColorMatch };

export const FavoriteColorItem = ({ color }: FavoriteColorItemProps) => {
  const { removeColor } = useColors();
  const { copy } = useCopy();
  const { sendAnalytics } = useSendAnalytics();
  const isLightColor = tinyColor(color?.value).isLight();

  return (
    <div className={'flex items-center gap-3 animate-fadeIn w-full'}>
      <div className={'flex items-center gap-1'}>
        <TrashIcon
          className={iconClassName}
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
      <div className={'w-full'}>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
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
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className={tooltipContentClassName}
                sideOffset={5}
              >
                Copy!
                <Tooltip.Arrow className="fill-zinc-200" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};
