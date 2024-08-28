import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
    const [gameState, setGameState] = useState({
        grid: Array(5).fill(Array(5).fill(null)),
        turn: 'A',
        winner: null,
        moves: []
    });

    const wsRef = useRef(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [validMoves, setValidMoves] = useState([]);

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

    const handleMove = (direction) => {
        if (gameState.winner || !selectedCharacter) return;
        const [player, character] = selectedCharacter.split('-');
        const move = {
            type: 'move',
            player,
            character,
            direction
        };
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify(move));
        }
        setSelectedCharacter(null);
        setValidMoves([]);
    };

    const handleCellClick = (rowIndex, colIndex) => {
        const cellValue = gameState.grid[rowIndex][colIndex];
        if (cellValue && cellValue.startsWith(gameState.turn)) {
            setSelectedCharacter(cellValue);
            const characterType = cellValue.split('-')[1];
            determineValidMoves(characterType);
        }
    };

    const determineValidMoves = (characterType) => {
        switch (characterType) {
            case 'P1':
            case 'P2':
            case 'P3':
                setValidMoves(['F', 'B', 'L', 'R']);
                break;
            case 'H1':
                setValidMoves(['F', 'B', 'L', 'R']);
                break;
            case 'H2':
                setValidMoves(['FL', 'FR', 'BL', 'BR']);
                break;
            default:
                setValidMoves([]);
        }
    };

    const handleReset = () => {
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({ type: 'reset' }));
        }
        setSelectedCharacter(null);
        setValidMoves([]);
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
                                <td
                                    key={colIndex}
                                    className={`cell ${cell === selectedCharacter ? 'selected' : ''}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="controls">
                {validMoves.includes('F') && <button onClick={() => handleMove('F')}>Forward</button>}
                {validMoves.includes('B') && <button onClick={() => handleMove('B')}>Backward</button>}
                {validMoves.includes('L') && <button onClick={() => handleMove('L')}>Left</button>}
                {validMoves.includes('R') && <button onClick={() => handleMove('R')}>Right</button>}
                {validMoves.includes('FL') && <button onClick={() => handleMove('FL')}>Forward Left</button>}
                {validMoves.includes('FR') && <button onClick={() => handleMove('FR')}>Forward Right</button>}
                {validMoves.includes('BL') && <button onClick={() => handleMove('BL')}>Backward Left</button>}
                {validMoves.includes('BR') && <button onClick={() => handleMove('BR')}>Backward Right</button>}
            </div>
            <button className="reset-button" onClick={handleReset}>Reset Game</button>

            <div className="move-history">
                <h2>Move History</h2>
                <ul>
                    {gameState.moves.map((move, index) => (
                        <li key={index}>{move}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
