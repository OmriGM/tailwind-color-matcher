import { FC } from 'react';

type Props = {
  colorHistory: string[];
};

const ColorHistory: FC<Props> = ({ colorHistory }) => {
  return (
    <div>
      <h1>Color History:</h1>
      <ul>
        {colorHistory.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
    </div>
  );
};

export default ColorHistory;
