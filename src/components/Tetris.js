import './Tetris.css';
import Board from './Board';
import GameStats from './GameStats';
import Previews from './Previews';

import { useBoard } from '../hooks/useBoard';
import { useGameStats } from '../hooks/useGameStats';
import { usePlayer } from '../hooks/usePlayer';

const Tetris = ({ rows, columns, setGameOver }) => {
  const [board] = useBoard(rows, columns);
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();

  return (
    <div className="Tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
    </div>
  );
};

export default Tetris;
