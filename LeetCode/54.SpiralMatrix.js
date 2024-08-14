//? 54. Spiral Matrix
// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]

// Example 2:
// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

var spiralOrder = function (matrix) {
  let result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  let direction = 0; // 0: right, 1: down, 2: left, 3: up
  const helper = (matrix, top, bottom, left, right, direction) => {
    if (top > bottom || left > right) return;

    if (direction === 0) {
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
        console.log("right", matrix[top][i]);
      }
      top++;
    } else if (direction === 1) {
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
        console.log("down", matrix[i][right]);
      }
      right--;
    } else if (direction === 2) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
        console.log("left", matrix[bottom][i]);
      }
      bottom--;
    } else if (direction === 3) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
        console.log("up", matrix[i][left]);
      }
      left++;
    }

    direction = (direction + 1) % 4;
    helper(matrix, top, bottom, left, right, direction);
  };

  helper(matrix, top, bottom, left, right, direction);
  return result;
};

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
); // [1,2,3,6,9,8,7,4,5]s
