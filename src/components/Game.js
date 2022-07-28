import Menu from './Menu';
import { useGameOver } from '../hooks/useGameOver';

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => {
    resetGameOver();
    console.log(`start gameover is ${gameOver}`);
  };
  return (
    <div className="Game">
      <Menu onClick={start} />
      <p> GAAAME </p>
      <p> rows {rows}</p>
      <p> columns {columns}</p>
    </div>
  );
};

export default Game;
