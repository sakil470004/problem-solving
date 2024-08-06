// 100. Same Tree
// Easy
// Topics
// Companies
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// Example 1:

// Input: p = [1,2,3], q = [1,2,3]
// Output: true
// Example 2:

// Input: p = [1,2], q = [1,null,2]
// Output: false
// Example 3:

// Input: p = [1,2,1], q = [1,1,2]
// Output: false

const isSameTree = (p, q)=> {
    // Define the recursive function to compare nodes
    const compareNodes = (node1, node2) => {
        // If both nodes are null, they are the same
        if (!node1 && !node2) return true;
        
        // If one node is null and the other is not, they are not the same
        if (!node1 || !node2) return false;
        
        // If the values of the nodes are different, they are not the same
        if (node1.val !== node2.val) return false;
        
        // Recursively check the left and right subtrees
        return compareNodes(node1.left, node2.left) && compareNodes(node1.right, node2.right);
    };
    
    // Start the comparison with the root nodes of both trees
    return compareNodes(p, q);
};

