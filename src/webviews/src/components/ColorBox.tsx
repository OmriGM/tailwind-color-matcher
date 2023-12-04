import { FC } from 'react';

type Props = {
  colorMatchObj: { name: string; value: string };
};

const ColorBox: FC<Props> = ({ colorMatchObj }) => {
  return (
    <div className="flex flex-col">
      <div
        className="w-11 h-9 border border-gray-300"
        style={{ backgroundColor: colorMatchObj.value }}
      ></div>
      <span>{colorMatchObj.name}</span>
      <span>{colorMatchObj.value}</span>
    </div>
  );
};

export default ColorBox;
