const player = (function() {
    let players = [];

    const getPlayers = function() {
        return players;
    } 

    const createNewPlayers = function(name) {
        const token = players.length + 1;
        if (name === '') {
            players.push({name: `Player${players.length + 1}`, token});
        } else {
            players.push({name, token});
        }
    }

    const clearPlayers = function() {
        players = [];
    }

    return {getPlayers, createNewPlayers, clearPlayers};
})();

const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    let board = [];

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

    const checkForTie = function() {
        const fullBoardOccupation = rows * columns;
        let occupationCounter = 0;
        board.forEach( (row) => {
            row.forEach( (boardTile) => {
                if (boardTile.token != 0) {
                    occupationCounter++;
                }
            })
        })

        if (occupationCounter === fullBoardOccupation) {
            return true;
        } else {
            return false;
        }
    }

    const checkForWinner = function() {
        if (board[0][0].token === board[0][1].token &&  board[0][1].token === board[0][2].token && board[0][0].token != 0) {
            return [board[0][0].token, '00', '01', '02'];
        } else if (board[1][0].token === board[1][1].token && board[1][1].token === board[1][2].token && board[1][0].token != 0) {
            return [board[1][0].token, '10', '11', '12'];
        } else if (board[2][0].token === board[2][1].token && board[2][1].token === board[2][2].token && board[2][0].token != 0) {
            return [board[2][0].token, '20', '21', '22'];
        } else if (board[0][0].token === board[1][0].token & board[1][0].token === board[2][0].token && board[0][0].token != 0) {
            return [board[0][0].token, '00', '10', '20'];
        } else if (board[0][1].token === board[1][1].token && board[1][1].token === board[2][1].token && board[0][1].token != 0) {
            return [board[0][1].token, '01', '11', '21'];
        } else if (board[0][2].token === board[1][2].token && board[1][2].token === board[2][2].token && board[0][2].token != 0) {
            return [board[0][2].token, '02', '12', '22'];
        } else if (board[0][0].token === board[1][1].token && board[1][1].token === board[2][2].token && board[0][0].token != 0) {
            return [board[0][0].token, '00', '11', '22'];
        } else if (board[0][2].token === board[1][1].token && board[1][1].token === board[2][0].token && board[0][2].token != 0) {
            return [board[0][2].token, '02', '11', '20'];
        } else {
            return false;
        }
    }

    return {getBoard, generateBoard, cellIsUnoccupied, updateCell, checkForTie, checkForWinner, resetBoard}
})();

const game = (function() {
    let currentPlayer = 0;

    const changePlayer = function() {
        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    const reset = function() {
        currentPlayer = 0;
        gameBoard.resetBoard();
        player.clearPlayers();
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
                gameBoard.updateCell(formattedInput, player.getPlayers()[currentPlayer]);
                return 1;
            }
        } 
    }

    const run = function(userInput) {
        if (player.getPlayers().length === 2) {

            const userInputReturnValue = submitUserInput(userInput);
            if (userInputReturnValue === 1) {
                const currentSymbol = currentPlayer === 0 ? 'X' : 'O';
                DOM.updateCell(userInput, currentSymbol);
                changePlayer();
            } 

            const winData = gameBoard.checkForWinner();
            if (winData) {
                DOM.makeCellsInactive();
                DOM.highlightWinningCells(winData[1], winData[2], winData[3]);
                DOM.showWinnerOutput(`${player.getPlayers()[winData[0] - 1].name} wins!`);
            } else if(gameBoard.checkForTie()) {
                DOM.showWinnerOutput(`It's a Tie!`);
            }
        }
    }

    return {run, reset};
})();

const DOM = (function() {
    const cells = document.querySelectorAll('.inactive-cell');
    const playerNameInputs = document.querySelectorAll('input');
    const startGameButton = document.getElementById('start-game');
    const output = document.getElementById('output');
    const outputSpan = document.getElementById('winner-output');
    const resetButton = document.getElementById('reset-button');

    const makeCellsActive = function() {
        cells.forEach((element) => element.setAttribute('class', 'cell'));
        cells.forEach((element) => element.addEventListener('click', () => game.run(element.getAttribute('id'))));
    }

    const makeCellsInactive = function() {
        cells.forEach((element) => element.setAttribute('class', 'inactive-cell'));
        cells.forEach((element) => element.removeEventListener('click', () => game.run(element.getAttribute('id'))));
    }

    const clearCells = function() {
        cells.forEach((element) => {
            if (element.firstElementChild != null) {
                element.innerHTML = '';
            }
        });
    }

    const highlightWinningCells = function(cell1, cell2, cell3) {
        const winningCells = [cell1, cell2, cell3];
        winningCells.forEach(function(cellId) {
            const currentCell = document.getElementById(cellId);
            currentCell.setAttribute('class', 'winning-cell');
        })
    }

    const showWinnerOutput = function(winnerMessage) {
        outputSpan.innerText = winnerMessage;
        output.setAttribute('style', 'visibility: visible;');
    }

    const resetWinnerOutput = function() {
        outputSpan.innerText = '';
        output.setAttribute('style', 'visibility: hidden;');
    }

    const setPlayerNames = function() {
        player.clearPlayers();
        playerNameInputs.forEach((input) => player.createNewPlayers(input.value));
    }

    const hideStartButton = function() {
        startGameButton.setAttribute('style', 'visibility: hidden;');
    }

    const showStartButton = function() {
        startGameButton.setAttribute('style', 'visibility: visible;');
    }

    const disablePlayerNameEntry = function() {
        playerNameInputs.forEach((element) => element.setAttribute('disabled', 'true'));
    }

    const enablePlayerNameEntry = function() {
        playerNameInputs.forEach((element) => element.removeAttribute('disabled'));
    }

    const updateCell = function(userInput, symbol) {
        const selectedCell = document.getElementById(`${userInput}`);
        const span = document.createElement('span');
        span.innerText = symbol;
        selectedCell.appendChild(span);
    }

    resetButton.addEventListener('click', function() {
        resetWinnerOutput();
        makeCellsInactive();
        clearCells();
        enablePlayerNameEntry();
        showStartButton();
        game.reset();
    });

    startGameButton.addEventListener('click', function() {
        hideStartButton();
        makeCellsActive();
        disablePlayerNameEntry();
        setPlayerNames();
    });

    return {updateCell, showWinnerOutput, makeCellsInactive, highlightWinningCells};
})();