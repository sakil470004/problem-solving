var isValidSudoku = function (board) {
    let row = new Array(9).fill(0).map(() => new Array(9).fill(0));
    let col = new Array(9).fill(0).map(() => new Array(9).fill(0));
    let box = new Array(9).fill(0).map(() => new Array(9).fill(0));
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
        if (board[i][j] !== ".") {
            let num = parseInt(board[i][j]) - 1;
            let k = parseInt(i / 3) * 3 + parseInt(j / 3);
            if (row[i][num] || col[j][num] || box[k][num]) {
            return false;
            }
            row[i][num] = col[j][num] = box[k][num] = 1;
        }
        }
    }
    return true;
};
const result = isValidSudoku([
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
]);
console.log(result); // true
