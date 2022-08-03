import { defaultCell } from './Cell';
import { transferToBoard } from './Tetrominoes';

export const buildBoard = ({ rows, columns }) => {
  const buildRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: buildRows,
    size: { rows, columns },
  };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  const furthestRight = board.size.columns - tetromino.shape.length;

  // const randomColumn = Math.floor(Math.random() * furthestRight);
  // position.column = randomColumn;

  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape,
  });

  if (player.collided || player.isFastDropping) {
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
  console.log(shape);
  console.log(shape.length);
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    // loop through the columns
    for (let x = 0; x < shape[y].length; x++) {
      console.log(shape[y].length);
      // if there's a piece of the tetromino in this position
      if (shape[y][x]) {
        console.log(shape.length);
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];
        console.log(`row: ${row}, column: ${column}`);

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
