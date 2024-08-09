// ? Sudoku Solver
//? https://leetcode.com/problems/sudoku-solver/
//? write a program to solve a Sudoku puzzle by filling the empty cells.
//? A sudoku solution must satisfy all of the following rules:
//? Each of the digits 1-9 must occur exactly once in each row.
//? Each of the digits 1-9 must occur exactly once in each column.
//? Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
//? The '.' character indicates empty cells.
//? Example 1:
//? Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]

//? Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
//? Explanation: The input board is shown above and the only valid solution is shown below:
//? Constraints:
//? board.length == 9
//? board[i].length == 9
//? board[i][j] is a digit or '.'.
//?Question: It is guaranteed that the input board has only one solution.
//?Question: Just find any solution.

var solveSudoku = function (board) {
  // the function modifies the board in place so we can return nothing
  function isValidMove(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num || board[row][x] === num) {
        return false;
      }
      let r = 3 * Math.floor(row / 3) + Math.floor(x / 3);
      let c = 3 * Math.floor(col / 3) + Math.floor(x % 3);
      if (board[r][c] === num) {
        return false;
      }
    }
    return true;
  }

  // helper function to solve the board
  function helper(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === ".") {
          for (let num = 1; num <= 9; num++) {
            let char = num.toString();
            if (isValidMove(board, row, col, char)) {
              board[row][col] = char;//fill the number in the board
              if (helper(board)) {
                return true;//to check if the board is solved or not
              }
              board[row][col] = ".";//backtracking
            }
          }
          return false;//if any number do not match for current position
        }
      }
    }
    return true;
  }
  helper(board);
};
console.log(
  solveSudoku([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ])
);
