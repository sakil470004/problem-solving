// Coding Interview Exercise: N Queen
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

var solveNQueens = function (n) {
    //Write Code here
    let res = [];
    // create the initial board setup with all empty spaces ('.')
    let board = new Array(n).fill().map(() => new Array(n).fill('.'));

    // convert the board array of arrays to array of strings
    function convertBoard(board) {
        return board.map(row => row.join(''));
    }

    // check if the current position is safe to place the queen at board[row][col]
    function isValid(row, col, board) {
        // check the same column for other queens
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        // check the left diagonal for other queens
        for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c] === 'Q') return false;
        }
        // check the right diagonal for other queens
        for (let r = row, c = col; r >= 0 && c < n; r--, c++) {
            if (board[r][c] === 'Q') return false;
        }
        return true;
    }

    // function to place the queens on the board
    function positionNextQueen(board, row) {
        // base case if all queen are placed
        if (row === n) {
            res.push(convertBoard(board));
            return;
        }

        // try placing a queen in each column of the current row
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, board)) {
                board[row][col] = 'Q';// place the queen
                //    now need to account row by row because we are placing queens row by row only one for each row
                positionNextQueen(board, row + 1);// move to the next row
                board[row][col] = '.';// backtrack : remove the queen
            }
        }
    }
    // start the recursion from the first row
    positionNextQueen(board, 0);
    return res;
};
console.log(solveNQueens(4));
