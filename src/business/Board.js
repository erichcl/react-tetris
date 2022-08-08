import { defaultCell } from './Cell';
import { transferToBoard } from './Tetrominoes';
import { movePlayer } from './PlayerController';

export const buildBoard = ({ rows, columns }) => {
  const buildRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: buildRows,
    size: { rows, columns },
  };
};

const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;
  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }
    row = position.row + i;
  }
  return { ...position, row };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape,
  });

  // Place ghost
  const className = `${tetromino.className} ${
    player.isFastDroping ? '' : 'ghost'
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDroping,
    position: dropPosition,
    rows,
    shape: tetromino.shape,
  });

  // Place the piece.
  // If it collided, mark the board cells as collided
  if (!player.isFastDroping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape,
    });
  }
  console.log('player.isFastDroping', player.isFastDroping);
  if (player.collided || player.isFastDroping) {
    console.log('player.isFastDroping', player.isFastDroping);
    resetPlayer();
  }

  // returns the next board
  return {
    rows,
    size: { ...board.size },
  };
};

export const isWithinBoard = ({ board, position, shape }) => {
  // loop through the rows
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    // loop through the columns
    for (let x = 0; x < shape[y].length; x++) {
      // if there's a piece of the tetromino in this position
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) {
          return false;
        }
      }
    }
  }
  return true;
};

export const hasCollision = ({ board, position, shape }) => {
  // loop through the rows
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    // loop through the columns
    for (let x = 0; x < shape[y].length; x++) {
      // if there's a piece of the tetromino in this position
      if (shape[y][x]) {
        const column = x + position.column;
        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
