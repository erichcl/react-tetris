import './GameController.css';

import { Action, actionForKey } from '../business/Input';
import { playerController } from '../business/PlayerController';

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const handleOnKeyUp = ({ code }) => {
    const action = actionForKey(code);
  };

  const handleOnKeyDown = ({ code }) => {
    const action = actionForKey(code);
    handleInput({ action });
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
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
