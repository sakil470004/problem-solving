function gridChallenge(grid) {
  const sortedGrid = grid.map((row) => row.split("").sort().join(""));
for (let i = 0; i < sortedGrid[0].length; i++) {
        for (let j = 0; j < sortedGrid.length - 1; j++) {
             if (sortedGrid[j][i] > sortedGrid[j + 1][i]) {
    
            return "NO";
        }
        }
    }
    return "YES";
  
}
const array = ["ebacd", "fghij", "olmkn", "trpqs", "xywuv"];
const result = gridChallenge(array);
console.log(result);
