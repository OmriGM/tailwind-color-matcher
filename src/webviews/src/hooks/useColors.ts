import { useContext } from 'react';
import { ColorContext } from '../providers/colorProvider';

export const useColors = () => useContext(ColorContext);
