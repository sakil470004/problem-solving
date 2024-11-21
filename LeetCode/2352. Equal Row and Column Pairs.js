// 2352. Equal Row and Column Pairs
// Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

// A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).



// Example 1:


// Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
// Output: 1
// Explanation: There is 1 equal row and column pair:
// - (Row 2, Column 1): [2,7,7]
// Example 2:


// Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// Output: 3
// Explanation: There are 3 equal row and column pairs:
// - (Row 0, Column 0): [3,1,2,2]
// - (Row 2, Column 2): [2,4,2,2]
// - (Row 3, Column 2): [2,4,2,2]

var equalPairs = function(grid) {
    let count = 0;
    const n = grid.length;
    
    // Helper function to get column as array
    const getColumn = (colIndex) => {
        let column = [];
        for(let i = 0; i < n; i++) {
            column.push(grid[i][colIndex]);
        }
        return column;
    }
    
    // Compare each row with each column
    for(let row = 0; row < n; row++) {
        for(let col = 0; col < n; col++) {
            // Get current row and column
            let currentRow = grid[row];
            let currentCol = getColumn(col);
            
            // Compare row and column as strings
            if(currentRow.join(',') === currentCol.join(',')) {
                count++;
            }
        }
    }
    
    return count;
};
console.log(equalPairs([[3, 1, 2, 2], [1, 4, 4, 5], [2, 4, 2, 2], [2, 4, 2, 2]]));//1