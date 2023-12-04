import { ChangeEvent } from 'react';
import { useColorMatch } from '../hooks/useColorMatch';

const ColorInput = () => {
  const { userColor, setUserColor } = useColorMatch();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserColor(target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={userColor}
        onChange={handleChange}
        className="border border-gray-300"
      />
      <div className="w-11 h-9" style={{ backgroundColor: userColor }}></div>
    </div>
  );
};

export default ColorInput;
