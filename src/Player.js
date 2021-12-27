import Draggable, {DraggableCore} from 'react-draggable';
import './App.css';
import React from 'react';

const Player = ({ color, onDrag, position, gk, hasBall }) => {
    return(
        <Draggable onDrag={onDrag} position={position}>
            <span className={`player ${color}`}>
                {gk && 'GK'}
                {hasBall && <span className='ball'></span>}
                </span>
        </Draggable>
    )
}

export default Player

