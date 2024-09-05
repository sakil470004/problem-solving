// 79. Word Search
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example 1:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
// Example 2:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

var exist = function(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    // Helper function to perform DFS
    const dfs = (i, j, index) => {
        if (index === word.length) return true; // Found the word
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[index]) return false;

        const temp = board[i][j];
        board[i][j] = '#'; // Mark the cell as visited

        // Explore all 4 directions: up, down, left, and right
        const found = dfs(i - 1, j, index + 1) || dfs(i + 1, j, index + 1) ||
                      dfs(i, j - 1, index + 1) || dfs(i, j + 1, index + 1);

        board[i][j] = temp; // Backtrack and unmark the cell
        return found;
    };

    // Try to find the word starting from each cell in the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }

    return false; // Return false if the word cannot be found
};


console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // true