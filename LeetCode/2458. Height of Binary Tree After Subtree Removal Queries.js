// 2458. Height of Binary Tree After Subtree Removal Queries
// You are given the root of a binary tree with n nodes. Each node is assigned a unique value from 1 to n. You are also given an array queries of size m.

// You have to perform m independent queries on the tree where in the ith query you do the following:

// Remove the subtree rooted at the node with the value queries[i] from the tree. It is guaranteed that queries[i] will not be equal to the value of the root.
// Return an array answer of size m where answer[i] is the height of the tree after performing the ith query.

// Note:

// The queries are independent, so the tree returns to its initial state after each query.
// The height of a tree is the number of edges in the longest simple path from the root to some node in the tree.
 

// Example 1:


// Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
// Output: [2]
// Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
// The height of the tree is 2 (The path 1 -> 3 -> 2).
// Example 2:


// Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
// Output: [3,2,3,2]
// Explanation: We have the following queries:
// - Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
// - Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
// - Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
// - Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.left = (left===undefined ? null : left);
 *     this.right = (right===undefined ? null : right);
 * }
 */

/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function(root, queries) {
    const depthMap = {};     // Maps depth -> nodes at that depth
    const heightMap = {};    // Maps node value -> height of that node
    const nodeDepthMap = {}; // Maps node value -> depth of that node

    // Step 1: DFS to calculate depth and height of each node
    function dfs(node, depth) {
        if (!node) return -1;
        
        nodeDepthMap[node.val] = depth;  // Track depth for each node

        const leftHeight = dfs(node.left, depth + 1);
        const rightHeight = dfs(node.right, depth + 1);
        
        const height = Math.max(leftHeight, rightHeight) + 1;
        heightMap[node.val] = height;
        
        if (!depthMap[depth]) depthMap[depth] = [];
        depthMap[depth].push([node.val, height]);
        
        return height;
    }
    
    dfs(root, 0);  // Start DFS from the root at depth 0

    // Step 2: Calculate max heights at each depth level
    const maxHeightsAtDepth = {};  // Maps depth -> [max1, max2] heights

    for (const [depth, nodes] of Object.entries(depthMap)) {
        nodes.sort((a, b) => b[1] - a[1]);  // Sort by height descending
        maxHeightsAtDepth[depth] = [
            nodes[0] ? nodes[0][1] : -1, 
            nodes[1] ? nodes[1][1] : -1
        ];
    }

    // Step 3: Process each query
    const results = [];
    for (const val of queries) {
        const depth = nodeDepthMap[val];     // Retrieve the depth of the node
        const [max1, max2] = maxHeightsAtDepth[depth];  // Retrieve heights at this depth
        
        if (heightMap[val] === max1) {
            results.push(max2 + depth);  // Second tallest height at this depth
        } else {
            results.push(max1 + depth);  // Tallest height at this depth remains
        }
    }
    
    return results;
};