import { useEffect, useState } from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import './App.css';
import { positions } from './positions'
import Player from './Player';

const RED = "red"
const BLUE = 'blue'

function App() {
  const [offside, setOffside] = useState(true)
  const [redPlayers, setRedPlayers] = useState({
    p1: positions.red.goal,
    p2:positions.red.p2,
    p3:positions.red.p3,
    p4:positions.red.p4,
    p5:positions.red.p5,
  })

  const [bluePlayers, setBluePlayers] = useState({
    p1: positions.blue.goal,
    p2:positions.blue.p2,
    p3:positions.blue.p3,
    p4:positions.blue.p4,
    p5:positions.blue.p5,
  })

  const onDragStateUpdate = (color, position, ui) => {
      color === RED ? setRedPlayers({...redPlayers, [position]: {x: ui.x, y: ui.y}}) : setBluePlayers({...bluePlayers, [position]: {x: ui.x, y: ui.y}})
      checkOffside()
  }

  const checkOffside = () => {
    
  }

  console.log(redPlayers)
  console.log(bluePlayers)
  return (
    <div className="App">
      <div className='halfway_line'></div>
      
      <span className={`player green`}></span>
      <Player color={RED} position={redPlayers.p1} gk onDrag={(e,ui) => onDragStateUpdate(RED, 'p1', ui)} />
      <Player color={RED} position={redPlayers.p2} onDrag={(e,ui) => onDragStateUpdate(RED, 'p2', ui)} />
      <Player color={RED} position={redPlayers.p3}  hasBall onDrag={(e,ui) => onDragStateUpdate(RED, 'p3', ui)} />
      <Player color={RED} position={redPlayers.p4} onDrag={(e,ui) => onDragStateUpdate(RED, 'p4', ui)} />
      <Player color={RED} position={redPlayers.p5}  onDrag={(e,ui) => onDragStateUpdate(RED, 'p5', ui)} />
      <Player color={BLUE} position={bluePlayers.p1} gk onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p1', ui)} />
      <Player color={BLUE} position={bluePlayers.p2} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p2', ui)} />
      <Player color={BLUE} position={bluePlayers.p3} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p3', ui)} />
      <Player color={BLUE} position={bluePlayers.p4} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p4', ui)} />
      <Player color={BLUE} position={bluePlayers.p5} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p5', ui)} />
      <h1 className='verdict'>{offside ? 'Red team is offside' : 'Red team is onside'}</h1>
    </div>
  );
}

export default App;
