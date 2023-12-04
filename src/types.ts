export type CommandTypes = 'matchColor' | 'setTailwindVersion';

export type TailwindNearestColorCommand = {
  command: string;
  callback: (...args: any[]) => any;
};
