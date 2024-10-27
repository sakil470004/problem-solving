// 1277. Count Square Submatrices with All Ones
// Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.



// Example 1:

// Input: matrix =
// [
//   [0,1,1,1],
//   [1,1,1,1],
//   [0,1,1,1]
// ]
// Output: 15
// Explanation: 
// There are 10 squares of side 1.
// There are 4 squares of side 2.
// There is  1 square of side 3.
// Total number of squares = 10 + 4 + 1 = 15.
// Example 2:

// Input: matrix = 
// [
//   [1,0,1],
//   [1,1,0],
//   [1,1,0]
// ]
// Output: 7
// Explanation: 
// There are 6 squares of side 1.  
// There is 1 square of side 2. 
// Total number of squares = 6 + 1 = 7.
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;

    // DP array to store the size of the largest square submatrix
    const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Iterate through the matrix
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Only consider cells with value 1
            if (matrix[i][j] === 1) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1; // If it's in the first row or column
                } else {
                    // Get the minimum value of the three adjacent cells and add 1
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                }
                count += dp[i][j]; // Add the count of squares
            }
        }
    }

    return count;
};

// Example usage:
const matrix = [
    [0,1,1,1],
    [1,1,1,1],
    [0,1,1,1]
];
console.log(countSquares(matrix)); // Output: 15
