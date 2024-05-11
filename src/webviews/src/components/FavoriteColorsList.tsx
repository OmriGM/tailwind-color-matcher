import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useColors } from '../hooks/useColors';
import { FavoriteColorItem } from './FavoriteColorItem';

export const FavoriteColors = () => {
  const { favoriteColors } = useColors();

  return (
    <>
      <div className={'flex items-center gap-2'}>
        <HeartFilledIcon />
        <span className={'text-xl'}>Favorite Colors</span>
      </div>
      <div
        className={'max-h-96 flex flex-col w-full overflow-y-auto gap-3 pr-2'}
      >
        {favoriteColors.length ? (
          favoriteColors.map((color) => (
            <FavoriteColorItem key={color.name} color={color} />
          ))
        ) : (
          <span className={'text-lg self-center mt-6'}>
            - Click on the ♡ to add a new color -
          </span>
        )}
      </div>
    </>
  );
};
