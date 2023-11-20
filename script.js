const player = (function() {
    let players = []

    const createPlayer = function(name) {
        const numOfPlayers = Object.keys(players);
        if (numOfPlayers.length < 2) {
            const token = numOfPlayers.length + 1;
            players.push({name, token});
        }
    }

    const clearPlayers = function() {
        players = [];
    }

    return {players, createPlayer, clearPlayers};
})();

const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const getBoard = function() {
        return board;
    }

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

    generateBoard();

    const resetBoard = function() {
        board = [];
        generateBoard();
    }

    //input is an array in form [row, column]
    const cellIsUnoccupied = function(cell) {
        if (board[cell[0]][cell[1]].token === 0) {
            return true;
        } else {
            return false;
        }
    }

    const updateCell = function(userInput, currentPlayer) {
        board[userInput[0]][userInput[1]].token = currentPlayer.token;
    }

    const checkForWinner = function() {
        if (board[0][0].token === board[0][1].token &&  board[0][1].token === board[0][2].token && board[0][0].token != 0) {
            return board[0][0].token;
        } else if (board[1][0].token === board[1][1].token && board[1][1].token === board[1][2].token && board[1][0].token != 0) {
            return board[1][0].token;
        } else if (board[2][0].token === board[2][1].token && board[2][1].token === board[2][2].token && board[2][0].token != 0) {
            return board[2][0].token;
        } else if (board[0][0].token === board[1][0].token & board[1][0].token === board[2][0].token && board[0][0].token != 0) {
            return board[0][0].token;
        } else if (board[0][1].token === board[1][1].token && board[1][1].token === board[2][1].token && board[0][1].token != 0) {
            return board[0][1].token;
        } else if (board[0][2].token === board[1][2].token && board[1][2].token === board[2][2].token && board[0][2].token != 0) {
            return board[0][2].token;
        } else if (board[0][0].token === board[1][1].token && board[1][1].token === board[2][2].token && board[0][0].token != 0) {
            return board[0][0].token;
        } else if (board[0][2].token === board[1][1].token && board[1][1].token === board[2][0].token && board[0][2].token != 0) {
            return board[0][2].token;
        } else {
            return false;
        }
    }

    return {getBoard, generateBoard, cellIsUnoccupied, updateCell, checkForWinner}
})();

const game = (function() {
    let currentPlayer = 0;

    const getCurrentPlayer = function() {
        return currentPlayer;
    }

    const changePlayer = function() {
        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    const validInput = function(userInput) {
        if (userInput.match('[0-2]{2}')) {
            return true;
        } else {
            return false;
        }
    }

    const convertInputToArray = function(userInput) {
        return userInput.split('');
    }

    const submitUserInput = function(userInput) {
        const isValidInput = validInput(userInput);
        if (isValidInput) {
            const formattedInput = convertInputToArray(userInput);
            if (gameBoard.cellIsUnoccupied(formattedInput)) {
                gameBoard.updateCell(formattedInput, player.players[currentPlayer])
                return 1;
            } else {
                return 2;
            }
        } else {
            return 3;
        }
    }

    const run = function(userInput) {
        if (player.players.length === 2) {

            const userInputReturnValue = submitUserInput(userInput);
            if (userInputReturnValue === 1) {
                const currentSymbol = currentPlayer === 0 ? 'X' : 'O'
                DOM.updateCell(userInput, currentSymbol)
                changePlayer();
            } else if (userInputReturnValue === 2) {
                alert('That cell is occupied, please enter another cell')
            } else if (userInputReturnValue === 3) {
                alert('Please enter a valid input in form "rowcolumn" ie "11", "21", etc.')
            } 

            const winner = gameBoard.checkForWinner();
            if (winner) {
                console.log(`${player.players[winner - 1].name} has won!`)
                gameComplete = true;
            }
        } else {
            console.log('Need two players!')
        }
    }

    return {run};
})();

const DOM = (function() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((element) => element.addEventListener('click', () => game.run(element.getAttribute('id'))));

    const updateCell = function(userInput, symbol) {
        const selectedCell = document.getElementById(`${userInput}`);
        const span = document.createElement('span');
        span.innerText = symbol;
        selectedCell.appendChild(span);
    }

    return {updateCell};
})();