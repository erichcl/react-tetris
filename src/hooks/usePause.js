import { useCallback, useState } from 'react';

export const usePause = ({ pauseDropTime, resumeDropTime }) => {
  const [isPaused, setIsPaused] = useState(false);

  const pause = useCallback(() => {
    setIsPaused(true);
    pauseDropTime();
  });

  const resume = useCallback(() => {
    setIsPaused(false);
    resumeDropTime();
  });

  return [isPaused, pause, resume];
};
