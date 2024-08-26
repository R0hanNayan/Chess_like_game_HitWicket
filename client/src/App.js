import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
    const [gameState, setGameState] = useState({
        grid: Array(5).fill(Array(5).fill(null)),
        turn: 'A',
        winner: null
    });

    const wsRef = useRef(null);

    useEffect(() => {
        wsRef.current = new WebSocket('wss://chess-like-game-hitwicket.onrender.com');

        wsRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'state') {
                setGameState(message.state);
            } else if (message.type === 'error') {
                alert(message.message);
            }
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const handleMove = (player, character, direction) => {
        if (gameState.winner) return;
        const move = {
            type: 'move',
            player,
            character,
            direction
        };
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify(move));
        }
    };

    const handleReset = () => {
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({ type: 'reset' }));
        }
    };

    return (
        <div className="App">
            <h1>Clash Of Grids</h1>
            {gameState.winner ? (
                <div className="winner-announcement">Winner: Player {gameState.winner}</div>
            ) : (
                <div className="turn-indicator">Turn: Player {gameState.turn}</div>
            )}
            <table>
                <tbody>
                    {gameState.grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} className="cell">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="moves-section">
                {gameState.turn === 'A' && (
                    <div className="player-controls">
                        <h3>Player A Moves</h3>
                        <button onClick={() => handleMove('A', 'P1', 'L')}>A-P1 L</button>
                        <button onClick={() => handleMove('A', 'P1', 'R')}>A-P1 R</button>
                        <button onClick={() => handleMove('A', 'P1', 'F')}>A-P1 F</button>
                        <button onClick={() => handleMove('A', 'P1', 'B')}>A-P1 B</button>
                        <button onClick={() => handleMove('A', 'P2', 'L')}>A-P2 L</button>
                        <button onClick={() => handleMove('A', 'P2', 'R')}>A-P2 R</button>
                        <button onClick={() => handleMove('A', 'P2', 'F')}>A-P2 F</button>
                        <button onClick={() => handleMove('A', 'P2', 'B')}>A-P2 B</button>
                        <button onClick={() => handleMove('A', 'P3', 'L')}>A-P3 L</button>
                        <button onClick={() => handleMove('A', 'P3', 'R')}>A-P3 R</button>
                        <button onClick={() => handleMove('A', 'P3', 'F')}>A-P3 F</button>
                        <button onClick={() => handleMove('A', 'P3', 'B')}>A-P3 B</button>
                        <button onClick={() => handleMove('A', 'H1', 'L')}>A-H1 L</button>
                        <button onClick={() => handleMove('A', 'H1', 'R')}>A-H1 R</button>
                        <button onClick={() => handleMove('A', 'H1', 'F')}>A-H1 F</button>
                        <button onClick={() => handleMove('A', 'H1', 'B')}>A-H1 B</button>
                        <button onClick={() => handleMove('A', 'H2', 'FL')}>A-H2 FL</button>
                        <button onClick={() => handleMove('A', 'H2', 'FR')}>A-H2 FR</button>
                        <button onClick={() => handleMove('A', 'H2', 'BL')}>A-H2 BL</button>
                        <button onClick={() => handleMove('A', 'H2', 'BR')}>A-H2 BR</button>
                    </div>
                )}
                {gameState.turn === 'B' && (
                    <div className="player-controls">
                        <h3>Player B Moves</h3>
                        <button onClick={() => handleMove('B', 'P1', 'L')}>B-P1 L</button>
                        <button onClick={() => handleMove('B', 'P1', 'R')}>B-P1 R</button>
                        <button onClick={() => handleMove('B', 'P1', 'F')}>B-P1 F</button>
                        <button onClick={() => handleMove('B', 'P1', 'B')}>B-P1 B</button>
                        <button onClick={() => handleMove('B', 'P2', 'L')}>B-P2 L</button>
                        <button onClick={() => handleMove('B', 'P2', 'R')}>B-P2 R</button>
                        <button onClick={() => handleMove('B', 'P2', 'F')}>B-P2 F</button>
                        <button onClick={() => handleMove('B', 'P2', 'B')}>B-P2 B</button>
                        <button onClick={() => handleMove('B', 'P3', 'L')}>B-P3 L</button>
                        <button onClick={() => handleMove('B', 'P3', 'R')}>B-P3 R</button>
                        <button onClick={() => handleMove('B', 'P3', 'F')}>B-P3 F</button>
                        <button onClick={() => handleMove('B', 'P3', 'B')}>B-P3 B</button>
                        <button onClick={() => handleMove('B', 'H1', 'L')}>B-H1 L</button>
                        <button onClick={() => handleMove('B', 'H1', 'R')}>B-H1 R</button>
                        <button onClick={() => handleMove('B', 'H1', 'F')}>B-H1 F</button>
                        <button onClick={() => handleMove('B', 'H1', 'B')}>B-H1 B</button>
                        <button onClick={() => handleMove('B', 'H2', 'FL')}>B-H2 FL</button>
                        <button onClick={() => handleMove('B', 'H2', 'FR')}>B-H2 FR</button>
                        <button onClick={() => handleMove('B', 'H2', 'BL')}>B-H2 BL</button>
                        <button onClick={() => handleMove('B', 'H2', 'BR')}>B-H2 BR</button>
                    </div>
                )}
            </div>
            <button className="reset-button" onClick={handleReset}>Reset Game</button>
        </div>
    );
};

export default App;
