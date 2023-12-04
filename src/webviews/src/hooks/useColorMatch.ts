import { useState } from 'react';

export const useColorMatch = () => {
  const [userColor, setUserColor] = useState('');
  const [colorMatchObj] = useState({
    name: '',
    value: '',
  });
  // const [colorHistory, setColorHistory] = useState<string[]>([]);

  // Logic to match colors and update history

  return { userColor, setUserColor, colorMatchObj };
};
