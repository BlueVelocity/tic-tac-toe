const player = (function() {
    const players = {};

    const createPlayer = function(name) {
        const numOfPlayers = Object.keys(players);
        if (numOfPlayers.length < 2) {
            const token = numOfPlayers.length + 1;
            players[`${token}`] = {name, token};
        }
    }

    const clearPlayers = function() {
        players = {};
    }

    return {players, createPlayer, clearPlayers};
})();

const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const Cell = function() {
        const token = 0;

        return {token};
    }
    
    const generateBoard = function() {
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let x = 0; x < columns; x++) {
                row.push(Cell());
            }
            board.push(row);
        }
    }

    return {board, generateBoard}
})();

const game = (function() {
    let currentPlayer = 1;

    const getCurrentPlayer = function() {
        return currentPlayer;
    }

    const changePlayer = function() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    const run = function() {
        let gameComplete = false;
        while (!gameComplete) {
            // Game logic
        }
    }

    return {getCurrentPlayer, changePlayer};
})();