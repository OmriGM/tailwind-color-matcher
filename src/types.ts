export type CommandTypes = 'matchColor' | 'setTailwindVersion';

export type TailwindColorMatcherCommand = {
  command: string;
  callback: (...args: any[]) => any;
};
