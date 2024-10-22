// 2583. Kth Largest Sum in a Binary Tree
// You are given the root of a binary tree and a positive integer k.

// The level sum in the tree is the sum of the values of the nodes that are on the same level.

// Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.

// Note that two nodes are on the same level if they have the same distance from the root.

 

// Example 1:


// Input: root = [5,8,9,2,1,3,7,4,6], k = 2
// Output: 13
// Explanation: The level sums are the following:
// - Level 1: 5.
// - Level 2: 8 + 9 = 17.
// - Level 3: 2 + 1 + 3 + 7 = 13.
// - Level 4: 4 + 6 = 10.
// The 2nd largest level sum is 13.
// Example 2:


// Input: root = [1,2,null,3], k = 1
// Output: 3
// Explanation: The largest level sum is 3.

function kthLargestLevelSum(root, k) {
    if (!root) return 0;

    let queue = [root];
    let levelSums = [];

    while (queue.length > 0) {
        let levelSize = queue.length;
        let levelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            levelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        levelSums.push(levelSum);
    }

    // Sort the sums in descending order and find the Kth largest
    levelSums.sort((a, b) => b - a);

    return levelSums[k - 1] || -1;
}

// Example usage:
// Define the binary tree nodes
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Example tree: [5,3,8,2,4,6,9]
//      5
//     / \
//    3   8
//   / \ / \
//  2  4 6  9

let root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(8);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(9);

console.log(kthLargestLevelSum(root, 2)); // Output: 17 (Level sums: [5, 11, 21])
