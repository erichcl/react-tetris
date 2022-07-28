import './style.css';

import Game from './components/Game';

function App() {
  return (
    <div className="App">
      {/* <h1> React Tetris Game</h1> */}
      <Game rows={20} columns={10} />
    </div>
  );
}

export default App;
