import * as Tooltip from '@radix-ui/react-tooltip';

const tooltipContentClassName =
  'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-stone-700 select-none rounded-[4px] bg-zinc-200 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]';

type TooltipProps = {
  children: React.ReactNode;
  text: string;
  delayDuration?: number;
};

export const ColorItemTooltip = ({
  children,
  text,
  delayDuration,
}: TooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={delayDuration || 50}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={tooltipContentClassName} sideOffset={5}>
            {text}
            <Tooltip.Arrow className="fill-zinc-200" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
