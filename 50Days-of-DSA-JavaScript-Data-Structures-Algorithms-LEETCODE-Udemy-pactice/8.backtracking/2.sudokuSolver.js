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

////? 2nd approach
// Another approach - Sudoku Solver ( JavaScript Code)
// We can use another approach to solve the Sudoku Solver question. Notice that here, we are using hashmaps (objects in JavaScript) to store the values in each row, column and box respectively.
var solveSudoku2 = function (board) {
  const boxes = Array.from({ length: 9 }, () => ({}));
  const rows = Array.from({ length: 9 }, () => ({}));
  const cols = Array.from({ length: 9 }, () => ({}));

  function getBox(row, col) {
    const newC = Math.floor(col / 3);
    const newR = Math.floor(row / 3) * 3;
    return newC + newR;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        const value = board[i][j];
        const x = getBox(i, j);
        boxes[x][value] = true;
        rows[i][value] = true;
        cols[j][value] = true;
      }
    }
  }

  function isValid(box, row, col, num) {
    return !(num in box || num in row || num in col);
  }

  function solveBacktrack(board, boxes, rows, cols, r, c) {
    // Corrected the base case to check if r === 9 
    if (r === 9) {
      return true;
    }
    if (board[r][c] === '.') {
      const boxId = getBox(r, c);
      for (let num = 1; num <= 9; num++) { // Corrected the range to stop at 9
        const numVal = String(num);
        const box = boxes[boxId];
        const row = rows[r];
        const col = cols[c];
        if (isValid(box, row, col, numVal)) {
          board[r][c] = numVal;
          box[numVal] = true;
          row[numVal] = true;
          col[numVal] = true;
          if (c === 8) {
            if (solveBacktrack(board, boxes, rows, cols, r + 1, 0)) return true;
          } else {
            if (solveBacktrack(board, boxes, rows, cols, r, c + 1)) return true;
          }
          // backtrack
          delete box[numVal];
          delete row[numVal];
          delete col[numVal];
          board[r][c] = '.';
        }
      }
      return false;
    } else {
      if (c === 8) {
        return solveBacktrack(board, boxes, rows, cols, r + 1, 0);
      } else {
        return solveBacktrack(board, boxes, rows, cols, r, c + 1);
      }
    }
  }
console.log(board, boxes, rows, cols, 0, 0);
  solveBacktrack(board, boxes, rows, cols, 0, 0);
};