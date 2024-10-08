// 637. Average of Levels in Binary Tree
// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: [3.00000,14.50000,11.00000]
// Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
// Hence return [3, 14.5, 11].
// Example 2:

// Input: root = [3,9,20,15,7]
// Output: [3.00000,14.50000,11.00000]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * [5,6,7,8,9]
 * // 9 [5,6,7,8]
 * // 8 [5,6,7]
 * //7 [5,6]
 * // push 10 [5,6,10]
 * ! [2,3,4,5,6,10]=> first =>0(n) , last => 0(1) , middle 0(n)
 * ? push(), pop() =>stack,get arrary[len-1]
 * ? queue => push () => shift()
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  const result = [];
  const queue = [root];

  while (queue.length) {
    let sum = 0;
    let count = queue.length;

    for (let i = 0; i < count; i++) {
      let node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(sum / count);
  }

  return result;
};
