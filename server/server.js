// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];
const gameState = {
  board: Array(5).fill(null).map(() => Array(5).fill(null)),
  players: { A: {}, B: {} },
  turn: "A",
};

// Function to initialize the game state
function initializeGame() {
  for (let i = 0; i < 5; i++) {
    gameState.players.A[`P${i + 1}`] = { x: 0, y: i };
    gameState.players.B[`P${i + 1}`] = { x: 4, y: i };
    gameState.board[0][i] = `A-P${i + 1}`;
    gameState.board[4][i] = `B-P${i + 1}`;
  }
}

initializeGame();

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.push(ws);

  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message);

    switch (type) {
      case "move":
        handleMove(data);
        break;
      default:
        break;
    }

    broadcastState();
  });

  ws.on("close", () => {
    clients.splice(clients.indexOf(ws), 1);
    console.log("Client disconnected");
  });
});

function handleMove({ player, pawn, direction }) {
  const { x, y } = gameState.players[player][pawn];
  const { newX, newY } = getNewPosition(x, y, direction, player);

  // Check if move is valid
  if (
    newX < 0 ||
    newX >= 5 ||
    newY < 0 ||
    newY >= 5 ||
    (gameState.board[newX][newY] &&
      gameState.board[newX][newY].startsWith(player))
  ) {
    return;
  }

  const opponent = player === "A" ? "B" : "A";
  const opponentPawn = gameState.board[newX][newY];

  if (opponentPawn && opponentPawn.startsWith(opponent)) {
    // Remove opponent pawn
    const [opponentPlayer, opponentPawnName] = opponentPawn.split("-");
    delete gameState.players[opponentPlayer][opponentPawnName];
  }

  gameState.board[x][y] = null;
  gameState.board[newX][newY] = `${player}-${pawn}`;
  gameState.players[player][pawn] = { x: newX, y: newY };

  gameState.turn = opponent;
}

function getNewPosition(x, y, direction, player) {
  switch (direction) {
    case "F":
      return player === "A" ? { newX: x + 1, newY: y } : { newX: x - 1, newY: y };
    case "B":
      return player === "A" ? { newX: x - 1, newY: y } : { newX: x + 1, newY: y };
    case "L":
      return { newX: x, newY: y - 1 };
    case "R":
      return { newX: x, newY: y + 1 };
    default:
      return { newX: x, newY: y };
  }
}

function broadcastState() {
  clients.forEach((client) => {
    client.send(JSON.stringify({ type: "update", data: gameState }));
  });
}

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
