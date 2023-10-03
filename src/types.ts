export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type ColorMatch = {
  name: string;
  value: string;
  rgb: RGB;
};

export type CommandTypes = 'matchColor' | 'setTailwindVersion';

export type TailwindNearestColorCommand = {
  command: string;
  callback: (...args: any[]) => any;
};
