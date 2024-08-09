//? N-Queens
// ? The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// ? Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
// ? Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.
//? give me leetcode link
// https://leetcode.com/problems/n-queens/

var solveNQueens = function (n) {
  let res = [];
  // create the initial board setup with all cells empty ('.')
  let board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));

  // converts the board array of arrays into an array of strings
  function convertBoard(board) {
    return board.map((row) => row.join(""));
  }

  //Checks if it's valid to place a queen at board[row][col]
  function isValid(row, col, board) {
    // check if there is a queen in the same column
    for (let x = 0; x < row; x++) {
      if (board[x][col] === "Q") return false;
    }
    // check the top-left diagonal
    for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
      if (board[r][c] === "Q") return false;
    }
    // check the top-right diagonal
    for (let r = row, c = col; r >= 0 && c < n; r--, c++) {
      if (board[r][c] === "Q") return false;
    }
    return true;
  }
  //   function to place queens on the board
  function positionNextQueen(board, row) {
    // base case: if we have placed all the queens
    if (row === n) {
      res.push(convertBoard(board));
      return;
    }
    //  try placing a queen in each column
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, board)) {
        board[row][col] = "Q"; //place the queen
        positionNextQueen(board, row + 1); //Move to the next row
        board[row][col] = "."; // backtrack : remove the queen
      }
    }
  }
    positionNextQueen(board, 0);// start from the first row
    return res; // return the result
};
console.log(solveNQueens(4)); // [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
