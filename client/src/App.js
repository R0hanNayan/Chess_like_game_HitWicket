import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

// Connect to the Socket.io server
const socket = io('https://chess-like-game-hitwicket.onrender.com');

function App() {
  const [board, setBoard] = useState(Array(25).fill(null));
  const [playerPosition, setPlayerPosition] = useState(12); // Starting position

  useEffect(() => {
    // Listen for position updates from the server
    socket.on('positionUpdate', (newPosition) => {
      setPlayerPosition(newPosition);
    });

    // Clean up on component unmount
    return () => {
      socket.off('positionUpdate');
    };
  }, []);

  const movePlayer = (direction) => {
    let newPosition = playerPosition;

    switch (direction) {
      case 'up':
        if (playerPosition >= 5) newPosition -= 5;
        break;
      case 'down':
        if (playerPosition < 20) newPosition += 5;
        break;
      case 'left':
        if (playerPosition % 5 !== 0) newPosition -= 1;
        break;
      case 'right':
        if (playerPosition % 5 !== 4) newPosition += 1;
        break;
      default:
        return;
    }

    setPlayerPosition(newPosition);
    socket.emit('movePlayer', newPosition); // Send the new position to the server
  };

  return (
    <div className="App">
      <h1>Player Movement</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${index === playerPosition ? 'active' : ''}`}
          >
            {index === playerPosition ? 'P' : ''}
          </div>
        ))}
      </div>
      <div className="controls">
        <p>Move Player:</p>
        <div className="button-grid">
            <button className="vertical-button" onClick={() => movePlayer('up')}>Up</button>
            <button className="vertical-button" onClick={() => movePlayer('down')}>Down</button>
            <button className="horizontal-button" onClick={() => movePlayer('left')}>Left</button>
            <button className="horizontal-button" onClick={() => movePlayer('right')}>Right</button>
        </div>
      </div>
    </div>
  );
}

export default App;
