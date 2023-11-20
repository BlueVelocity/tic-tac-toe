const player = function(token) {

    return {token};
};

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

})();