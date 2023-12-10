import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import tinyColor from 'tinycolor2';
import { useColors } from '../hooks/useColors';
import { CopyColorButton } from './CopyColorButton';
import { ColorMatch } from '../types';

type ColorBoxProps = {
  colorMatch?: ColorMatch;
};

export const ColorBox = ({ colorMatch }: ColorBoxProps) => {
  const isLightColor = tinyColor(colorMatch?.value).isLight();
  const { favoriteColors, addColor, removeColor } = useColors();
  const [effect, setEffect] = useState(false);

  const iconClassName = `w-7 h-7 z-10 cursor-pointer ${
    isLightColor ? 'text-black' : 'text-white'
  }`;

  if (!colorMatch) return null;

  const renderColorActions = () => (
    <>
      {favoriteColors.some((color) => color.name === colorMatch.name) ? (
        <HeartFilledIcon
          onAnimationEnd={() => setEffect(false)}
          className={`${iconClassName} ${effect && 'animate-wiggle'}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            removeColor(colorMatch);
          }}
        />
      ) : (
        <HeartIcon
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setEffect(true);
            addColor(colorMatch);
          }}
          className={iconClassName}
        />
      )}
      <CopyColorButton iconClassName={iconClassName} value={colorMatch.name} />
    </>
  );
  return (
    <div
      className={`bg-${colorMatch.name} h-44 rounded-md relative w-full`}
      style={{ background: colorMatch.value }}
    >
      <div className={'flex gap-1 absolute right-2 top-2'}>
        {renderColorActions()}
      </div>
      <span
        className={
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
        }
      >
        <div className={'flex flex-col items-center'}>
          <span
            className={`${
              isLightColor ? 'text-black' : 'text-white'
            } text-sm font-extrabold sm:text-xl`}
          >
            {colorMatch.name}
          </span>
        </div>
      </span>
    </div>
  );
};
