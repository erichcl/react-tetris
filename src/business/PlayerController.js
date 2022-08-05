import { isWithinBoard, hasCollision } from '../business/Board';
import { Action } from '../business/Input';
import { rotate } from '../business/Tetrominoes';

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return {
    collided: isHit,
    nextPosition,
  };
};

const attemptMovement = ({
  board,
  player,
  setPlayer,
  setGameOver,
  addDelta,
  isFastDroping,
}) => {
  const delta = { row: 0, column: 0 };
  if (!isFastDroping) {
    delta.row += addDelta.row;
    delta.column -= addDelta.column;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDroping,
    position: nextPosition,
  });
};

const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
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

const pieceController = ({ action, board, player, setPlayer, setGameOver }) => {
  // eslint-disable-next-line default-case
  switch (action) {
    case Action.Rotate:
      attemptRotation({ board, player, setPlayer });
      break;
    case Action.Left:
      attemptMovement({
        board,
        player,
        setPlayer,
        setGameOver,
        addDelta: { row: 0, column: +1 },
        isFastDroping: false,
      });
      break;
    case Action.Right:
      attemptMovement({
        board,
        player,
        setPlayer,
        setGameOver,
        addDelta: { row: 0, column: -1 },
        isFastDroping: false,
      });
      break;
    case Action.FastDrop:
      attemptMovement({
        board,
        player,
        setPlayer,
        setGameOver,
        addDelta: { row: 0, column: 0 },
        isFastDroping: true,
      });
      break;
    case Action.SlowDrop:
      attemptMovement({
        board,
        player,
        setPlayer,
        setGameOver,
        addDelta: { row: 1, column: 0 },
        isFastDroping: false,
      });
      break;
  }
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
  isPaused,
  pause,
  resume,
}) => {
  if (!action) return;

  switch (action) {
    case Action.Quit:
      setGameOver(true);
      break;
    case Action.Pause:
      console.log('pause');
      console.log(isPaused);
      if (!isPaused) {
        pause();
      } else {
        resume();
      }
      break;
    default:
      if (!isPaused) {
        pieceController({
          action,
          board,
          player,
          setPlayer,
          setGameOver,
        });
      }
  }
};
