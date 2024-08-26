# HITWICKET SOFTWARE ENGINEER ASSIGNMENT
# CLASH OF GRIDS

#### Access the deployed site at: https://chess-like-game-hitwicket-1.onrender.com/

## Prerequisites

Node.js: Ensure you have Node.js installed on your machine.

npm: Node Package Manager (comes with Node.js).

## Installation

Clone the repository:

```bash
git clone https://github.com/R0hanNayan/ROHAN_NAYAN_21BCI0040.git
```

## Navigate to the project directory:

```bash
cd ROHAN_NAYAN_21BCI0040

cd client

npm install

cd ../server

npm install
```

## Running the Application

```bash
Start the server:

cd server

node server.js


Start the client:

cd ../client

npm start
```

Access the game: Open your web browser and navigate to http://localhost:3000 to start playing the game.

```bash
Configuration
WebSocket URL: Update the WebSocket URL in src/App.js if your server URL changes:

const ws = new WebSocket('wss://chess-like-game-hitwicket.onrender.com');
```

## Game Rules

### Game Setup
```bash
The game is played between two players on a 5x5 grid.

Each player controls a team of 5 characters, which can include Pawns, Hero1, and Hero2.

Players arrange their characters on their respective starting rows at the beginning of the game.

Characters and Movement

There are three types of characters available:
```
```
Pawn:

Moves one block in any direction (Left, Right, Forward, or Backward).

Move commands: L (Left), R (Right), F (Forward), B (Backward)
```
```
Hero1:

Moves two blocks straight in any direction.

Kills any opponent's character in its path.

Move commands: L (Left), R (Right), F (Forward), B (Backward)
```
```
Hero2:

Moves two blocks diagonally in any direction.

Kills any opponent's character in its path.

Move commands: FL (Forward-Left), FR (Forward-Right), BL (Backward-Left), BR (Backward-Right)

All moves are relative to the player's perspective.
```
