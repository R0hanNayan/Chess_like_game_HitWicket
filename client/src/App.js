import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [gameState, setGameState] = useState({
        grid: Array(5).fill(Array(5).fill(null)),
        turn: 'A',
        winner: null
    });
    const [playerMove, setPlayerMove] = useState('');

    useEffect(() => {
        const ws = new WebSocket('wss://chess-like-game-hitwicket.onrender.com');
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'state') {
                setGameState(message.state);
            } else if (message.type === 'error') {
                alert(message.message); 
            }
        };
        
        return () => {
            ws.close();
        };
    }, []);

    const handleSubmitMove = () => {
        if (playerMove.trim()) {
            const command = playerMove.trim();
            const player = gameState.turn;
            const [character, direction] = command.split(':');
            const ws = new WebSocket('wss://chess-like-game-hitwicket.onrender.com');
            ws.onopen = () => {
                ws.send(JSON.stringify({ type: 'move', player, character, direction }));
            };
            setPlayerMove('');
        }
    };

    return (
        <div className='dark-mode'>
            <h1>Clash Of Grids</h1>
            <div id="game-board">
                {gameState.grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className={`grid-cell ${cell ? cell.split('-')[0].toLowerCase() : ''}`}>
                            {cell ? cell.split('-')[1] : ''}
                        </div>
                    ))
                ))}
            </div>
            <div id="controls">
                <input
                    type="text"
                    value={playerMove}
                    onChange={(e) => setPlayerMove(e.target.value)}
                    placeholder={`Player ${gameState.turn} move (e.g., P1:L)`}
                />
                <button onClick={handleSubmitMove}>Submit Move</button>
            </div>
            <div id="game-status">
                {gameState.winner ? `Game Over! Player ${gameState.winner} wins!` : `Current Turn: Player ${gameState.turn}`}
            </div>
        </div>
    );
};

export default App;
