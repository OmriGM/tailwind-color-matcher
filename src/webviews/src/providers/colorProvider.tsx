import { ReactNode, createContext, useState, useEffect } from 'react';
import { ColorMatch } from '../types';

type ColorContextType = {
  favoriteColors: ColorMatch[];
  addColor: (colorClass: ColorMatch) => void;
  removeColor: (colorClass: ColorMatch) => void;
};

export const ColorContext = createContext<ColorContextType>({
  favoriteColors: [],
  addColor: () => {},
  removeColor: () => {},
});

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteColors, setFavoriteColors] = useState<ColorMatch[]>(
    tsvscode.getState() ?? [],
  );

  useEffect(() => {
    tsvscode.setState(favoriteColors);
  }, [favoriteColors.length]);

  const addColor = (colorClass: ColorMatch) => {
    setFavoriteColors([colorClass, ...favoriteColors]);
  };

  const removeColor = (colorClass: ColorMatch) => {
    setFavoriteColors(
      favoriteColors.filter((color) => color.name !== colorClass.name),
    );
  };

  // const sortFavoriteColors = () => {
  //   const sortedColors = favoriteColors.sort((a, b) => {
  //     if (a.name < b.name) return -1;
  //     return 1;
  //   });
  //   setFavoriteColors(sortedColors);
  // };

  return (
    <ColorContext.Provider value={{ favoriteColors, addColor, removeColor }}>
      {children}
    </ColorContext.Provider>
  );
};
