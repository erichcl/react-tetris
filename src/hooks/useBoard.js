import { useCallback, useState } from 'react';
import { buildBoard } from '../business/Board';

export const useBoard = (rows, columns) => {
  const [board] = useState(buildBoard(rows, columns));

  return [board];
};
