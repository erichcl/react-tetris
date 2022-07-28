import { useState, useCallback } from 'react';

const buildGameStats = () => ({
  level: 1,
  points: 0,
  linesCompleted: 0,
  linesPerLevel: 10,
});

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());

  const addLinesCleared = useCallback((linesCleared) => {}, []);

  return [gameStats, addLinesCleared];
};
