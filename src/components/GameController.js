import './GameController.css';

import { Action, actionForKey, actionIsDrop } from '../business/Input';
import { playerController } from '../business/PlayerController';

import { useInterval } from '../hooks/useInterval';
import { useDropTime } from '../hooks/useDropTime';
import { usePause } from '../hooks/usePause';

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });

  const [isPaused, pause, resume] = usePause({ pauseDropTime, resumeDropTime });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const handleOnKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) {
      resumeDropTime();
    }
  };

  const handleOnKeyDown = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) {
      pauseDropTime();
    }
    handleInput({ action });
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
      dropTime,
      pauseDropTime,
      resumeDropTime,
      isPaused,
      pause,
      resume,
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyUp={handleOnKeyUp}
      onKeyDown={handleOnKeyDown}
      autoFocus
    />
  );
};

export default GameController;
