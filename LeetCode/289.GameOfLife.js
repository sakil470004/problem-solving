// 289. Game of Life
// According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

// The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

// Any live cell with fewer than two live neighbors dies as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the m x n grid board, return the next state.

// Example 1:
// Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
// Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
// Example 2:
// Input: board = [[1,1],[1,0]]
// Output: [[1,1],[1,1]]

var gameOfLife = function (board) {
  let m = board.length;
  let n = board[0].length;

  // Create a copy of the original board
  const copyBoard = board.map((arr) => arr.slice());

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // Top-left, Top, Top-right
    [0, -1],
    [0, 1], // Left,     , Right
    [1, -1],
    [1, 0],
    [1, 1], // Bottom-left, Bottom, Bottom-right
  ];
  // find if the cell is alive or dead and return the count of live neighbors
  const countLiveNeighbors = (row, col) => {
    let liveNeighbors = 0;
    for (let [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      if (r >= 0 && r < m && c >= 0 && c < n && copyBoard[r][c] === 1) {
        liveNeighbors++;
      }
    }
    return liveNeighbors;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let liveNeighbors = countLiveNeighbors(i, j);

      if (copyBoard[i][j] === 1) {
        // Cell is currently alive
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 0; // Cell dies
        }
      } else {
        // Cell is currently dead
        if (liveNeighbors === 3) {
          board[i][j] = 1; // Cell becomes alive
        }
      }
    }
  }
};
