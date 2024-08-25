# CLASH OF GRIDS

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
