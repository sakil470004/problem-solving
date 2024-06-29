const empty_cell = ".";
const bomb_cell = "O";

function fillGrid(grid) {
  const col_max = grid[0].length;
  return grid.fill(bomb_cell.repeat(col_max));
}

function iterateGrid(grid) {
  let explosions = []; // storing row and col indeces
  for (let row = 0; row < grid.length; row++) {
    let newRow = "";
    for (let col = 0; col < grid[row].length; col++) {
      const char = grid[row][col];
      let newChar = char;
      switch (char) {
        case "0":
          newChar = "3";
          break;
        case "1":
          explosions.push([row, col]);
          break;
        case "2":
          newChar = "1";
          break;
        case "3":
          newChar = "2";
      }
      newRow += newChar;
    }
    grid[row] = newRow;
  }
  // handle exploding bombs
  if (explosions.length) {
    // using array as queue
    for (const [row, col] of explosions) explodeBomb(grid, row, col);
  }
  return grid;
}

function replaceCharAt(string, char, index) {
  return string.slice(0, index) + char + string.slice(index + 1);
}

function explodeBomb(grid, row, col) {
  const row_max = grid.length;
  const col_max = grid[0].length;
  // center
  grid[row] = replaceCharAt(grid[row], "0", col);

  // up
  if (row - 1 >= 0) grid[row - 1] = replaceCharAt(grid[row - 1], "0", col);

  // down
  if (row + 1 < row_max) grid[row + 1] = replaceCharAt(grid[row + 1], "0", col);

  // left
  if (col - 1 >= 0) grid[row] = replaceCharAt(grid[row], "0", col - 1);

  // right
  if (col + 1 < col_max) grid[row] = replaceCharAt(grid[row], "0", col + 1);
}

function formatGrid(grid, format) {
  for (let row = 0; row < grid.length; row++) {
    if (format === "output") {
      // replace non-0 with bombs, and 0's with empty cell
      grid[row] = grid[row]
        .replace(/[^0]/g, bomb_cell)
        .replace(/0/g, empty_cell);
    } else {
      const bomb_cell_re = new RegExp(bomb_cell, "g");
      const empty_cell_re = new RegExp("\\" + empty_cell, "g");
      // replace bomb cell with 2s, and empty cells with 0s
      grid[row] = grid[row].replace(bomb_cell_re, 2).replace(empty_cell_re, 0);
    }
  }
  return grid;
}

function bomberMan(n, grid) {
  if (n === 1) return grid;

  // if even, return filled grid
  if (n % 2 === 0) return fillGrid(grid);

  // using numbers (different format) to track when bombs will explode
  grid = formatGrid(grid); // O(n * m)
  grid = iterateGrid(grid); // O(n * m)

  // remove repeated cycles
  n -= 2;
  n %= 4;

  while (n) {
    // O(4)
    grid = iterateGrid(grid); // O(n * m)
    n--;
  }

  // reformat back to original "." and "O"
  grid = formatGrid(grid, "output"); // O(n * m)

  return grid;
}
// Example usage:
const initialGrid = [
  ".......",
  "...O...",
  "....O..",
  ".......",
  "OO.....",
  "OO.....",
];
const n = 3;
console.log(bomberMan(n, initialGrid));
