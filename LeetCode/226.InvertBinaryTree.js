var invertTree = function(root) {
    // Base case: if the node is null, return null
    if (root === null) {
        return null;
    }
    
    // Swap the left and right children
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    // Recursively invert the left and right subtrees
    invertTree(root.left);
    invertTree(root.right);
    
    // Return the current node
    return root;
};