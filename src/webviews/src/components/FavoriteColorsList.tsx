import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useColors } from '../hooks/useColors';
import { FavoriteColorItem } from './FavoriteColorItem';

export const FavoriteColors = () => {
  const { favoriteColors } = useColors();

  return (
    <>
      <div className={'flex items-center gap-2'}>
        <HeartFilledIcon />
        <h2>Favorite Colors</h2>
      </div>
      <div className={'flex flex-col w-full overflow-y-auto gap-3'}>
        {favoriteColors.length
          ? favoriteColors.map((color) => (
              <FavoriteColorItem key={color.name} color={color} />
            ))
          : 'No favorite colors yet'}
      </div>
    </>
  );
};
