import { useEffect, useState } from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import './App.css';
import { positions } from './positions'
import Player from './Player';

const RED = "red"
const BLUE = 'blue'

const TEAM_SIZE = 5

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

  //red p3 has the ball
  const checkOffside = () => {
    //check which team has ball
    const ball_team = RED //change to dynamic when ball can change

    const players = ball_team === RED ? redPlayers : bluePlayers
    const furthest_ally = getFurthestPlayer(ball_team)

    const opposing_distances = getOpposingDistances(ball_team === RED ? BLUE : RED)

    let counter = 0

    
    for (const distance of opposing_distances){
      if (ball_team === RED){//check more than
        if (players[furthest_ally].x > distance) counter++
      }else{
        if (players[furthest_ally].x < distance) counter++ 
      }
    }
    
    const enemies_nearer_goal = TEAM_SIZE - counter
    console.log(enemies_nearer_goal)
    if (enemies_nearer_goal < 2){
      if (!offside) setOffside(true)
    }else{
      if (offside) setOffside(false)
    }
  }

  const getOpposingDistances = color => {
    const players = color === RED ? redPlayers : bluePlayers
    let player_distances = []
    Object.keys(players).forEach(function(key) {
      player_distances.push(players[key].x)
    });
    return (player_distances)
  }

  
  const getFurthestPlayer = color => {
    const players = color === RED ? redPlayers : bluePlayers
    let furthest = null
    Object.keys(players).forEach(function(key) {
      //console.log(`${key}: ${players[key].x}`)
      if (color === RED){
        if (!furthest || players[key].x > players[furthest].x){
          furthest = key
        }
      }else{
        if (!furthest || players[key].x < players[furthest].x){
          furthest = key
        }
      }
      
    });
    return (furthest)
  }
  
  checkOffside()

  return (
    <div className="App">
      <div className='halfway_line'></div>
      
      <span className={`player green`}></span>
      <Player color={RED} position={redPlayers.p1} gk onDrag={(e,ui) => onDragStateUpdate(RED, 'p1', ui)} />
      <Player color={RED} position={redPlayers.p2} onDrag={(e,ui) => onDragStateUpdate(RED, 'p2', ui)} />
      <Player color={RED} position={redPlayers.p3} hasBall onDrag={(e,ui) => onDragStateUpdate(RED, 'p3', ui)} />
      <Player color={RED} position={redPlayers.p4} onDrag={(e,ui) => onDragStateUpdate(RED, 'p4', ui)} />
      <Player color={RED} position={redPlayers.p5}  onDrag={(e,ui) => onDragStateUpdate(RED, 'p5', ui)} />
      <Player color={BLUE} position={bluePlayers.p1} gk onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p1', ui)} />
      <Player color={BLUE} position={bluePlayers.p2} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p2', ui)} />
      <Player color={BLUE} position={bluePlayers.p3} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p3', ui)} />
      <Player color={BLUE} position={bluePlayers.p4} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p4', ui)} />
      <Player color={BLUE} position={bluePlayers.p5} onDrag={(e,ui) => onDragStateUpdate(BLUE, 'p5', ui)} />
      <h1 className='verdict'>{offside ? <p>Red team is <span className='offside'>offside</span></p> : <p>Red team is onside</p>}</h1>
    </div>
  );
}

export default App;
