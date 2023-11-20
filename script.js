const player = (function() {
    const players = []

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

    return {getBoard, generateBoard, cellIsUnoccupied, updateCell}
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
        console.log(userInput);
        if (userInput === 'quit') {
            return 0;
        } else {
            const isValidInput = validInput(userInput);
            if (isValidInput) {
                const formattedInput = convertInputToArray(userInput);
                if (gameBoard.cellIsUnoccupied(formattedInput)) {
                    gameBoard.updateCell(formattedInput, player.players[currentPlayer])
                    changePlayer();
                    return 1;
                } else {
                    return 2;
                }
            } else {
                return 3;
            }
        }
    }

    const run = function() {
        if (Object.keys(player.players).length = 2) {
            gameBoard.generateBoard();
            let gameComplete = false;
            while (!gameComplete) {
                let inputIsValid = false;
                while (inputIsValid === false) {
                    let userInput = prompt(`${player.players[`${currentPlayer}`].name}, please enter a position. Type "quit" to exit.`);
                    const userInputReturnValue = submitUserInput(userInput);
                    if (userInputReturnValue === 1) {
                        //isvalid and is empty space
                        inputIsValid = true;
                    } else if (userInputReturnValue === 2) {
                        alert('That cell is occupied, please enter another cell')
                    } else if (userInputReturnValue === 3) {
                        alert('Please enter a valid input in form "rowcolumn" ie "11", "21", etc.')
                    } else if (userInput === 0) {
                        inputIsValid = true;
                        gameComplete = true;
                    }
                }
            }
        } else {
            console.log('Need two players!')
        }
    }

    return {run};
})();