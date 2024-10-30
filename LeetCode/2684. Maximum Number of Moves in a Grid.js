// 2684. Maximum Number of Moves in a Grid
// You are given a 0-indexed m x n matrix grid consisting of positive integers.

// You can start at any cell in the first column of the matrix, and traverse the grid in the following way:

// From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, should be strictly bigger than the value of the current cell.
// Return the maximum number of moves that you can perform.

 

// Example 1:


// Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
// Output: 3
// Explanation: We can start at the cell (0, 0) and make the following moves:
// - (0, 0) -> (0, 1).
// - (0, 1) -> (1, 2).
// - (1, 2) -> (2, 3).
// It can be shown that it is the maximum number of moves that can be made.
// Example 2:


// Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
// Output: 0
// Explanation: Starting from any cell in the first column we cannot perform any moves.

/**
 * @param {number[][]} grid
 * @return {number}
 */
//chat gpt
var maxMoves = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 1], [0, 1], [1, 1]];  // top-right, right, bottom-right
    const memo = Array.from({ length: rows }, () => Array(cols).fill(-1));
    
    // Helper function to perform DFS with memoization
    function dfs(r, c) {
        if (memo[r][c] !== -1) return memo[r][c]; // Return memoized result if available

        let maxPath = 0;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            // Check if the move is within bounds and strictly increasing
            if (nr >= 0 && nr < rows && nc < cols && grid[nr][nc] > grid[r][c]) {
                maxPath = Math.max(maxPath, 1 + dfs(nr, nc));
            }
        }

        memo[r][c] = maxPath; // Memoize the result for current cell
        return maxPath;
    }
    
    let maxMoves = 0;

    // Try to start DFS from every cell in the first column
    for (let r = 0; r < rows; r++) {
        maxMoves = Math.max(maxMoves, dfs(r, 0));
    }

    return maxMoves;
};
