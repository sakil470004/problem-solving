// 108. Convert Sorted Array to Binary Search Tree
// Given an integer array nums where the elements are sorted in ascending order, convert it to a 
// height-balanced
//  binary search tree.

 

// Example 1:


// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:

// Example 2:


// Input: nums = [1,3]
// Output: [3,1]
// Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

var sortedArrayToBST = function(nums) {
    // Helper function to recursively build the tree
    function buildTree(left, right) {
        // Base case: if left index exceeds right, return null (no node)
        if (left > right) {
            return null;
        }

        // Choose the middle element to be the root of the current subtree
        let mid = Math.floor((left + right) / 2);

        // Create a new TreeNode with the value of the middle element
        let node = new TreeNode(nums[mid]);

        // Recursively build the left subtree using the left half of the array
        node.left = buildTree(left, mid - 1);

        // Recursively build the right subtree using the right half of the array
        node.right = buildTree(mid + 1, right);

        // Return the node, which becomes the root of this subtree
        return node;
    }

    // Call the helper function, starting with the full array (indices 0 to nums.length - 1)
    return buildTree(0, nums.length - 1);
};

//! Recursive Approach:

//? The problem asks to convert a sorted array into a height-balanced binary search tree (BST). In a height-balanced BST, the depth difference between the left and right subtrees of any node is at most 1.
// The middle element of the array is chosen as the root to ensure balance.
// How the Recursion Works:

//? Base Case: If the left index exceeds the right index (left > right), there's no element to form a node, so we return null (empty subtree).
//? Recursive Case:
//? The middle element of the current subarray is selected as the root of the current subtree.
//? The left half of the array (before the middle) is used to construct the left subtree.
//? The right half of the array (after the middle) is used to construct the right subtree.
//? TreeNode Creation:

//? A new node is created for the root of the current subtree using the middle element.
//? The recursive calls construct the left and right subtrees.
//? Time Complexity:

//? Each element in the array is processed once to create a node, so the time complexity is O(n) where n is the number of elements in the array.
//? This approach efficiently builds a height-balanced BST from a sorted array by repeatedly dividing the array into halves, ensuring the balance condition is maintained at every level of recursion.