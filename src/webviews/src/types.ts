export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type ColorMatch = {
  name: string;
  value: string;
  rgb?: RGB;
  distance: number;
};
