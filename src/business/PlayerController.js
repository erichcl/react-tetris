import { isWithinBoard, hasCollision } from '../business/Board';
import { Action } from '../business/Input';
import { rotate } from '../business/Tetrominoes';

const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetrmino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  } else {
    return false;
  }
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;
  // eslint-disable-next-line default-case
  switch (action) {
    case Action.Quit:
      setGameOver(true);
      break;

    case Action.Rotate:
      attemptRotation({ board, player, setPlayer });
      break;
  }
};
