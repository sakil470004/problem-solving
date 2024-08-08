//? 101. Symmetric Tree
// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
// mine code
var isSymmetric = function(root) {
    if (!root) return true;
    const isMirror = (left, right) => {
        if (!left && !right) return true;
        if (!left || !right) return false;
        if (left.val !== right.val) return false;
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }
    return isMirror(root.left, root.right);
};

// chat gpt given code

var isSymmetric2 = function(root) {
    // Helper function to check if two trees are mirror images
    const isMirror = function(tree1, tree2) {
        // If both nodes are null, they are symmetric
        if (!tree1 && !tree2) return true;
        
        // If one is null and the other is not, they are not symmetric
        if (!tree1 || !tree2) return false;
        
        // If the values of the nodes are different, they are not symmetric
        if (tree1.val !== tree2.val) return false;
        
        // Recursively check the children
        return isMirror(tree1.left, tree2.right) && isMirror(tree1.right, tree2.left);
    };
    
    // Start the recursion with the left and right children of the root
    return isMirror(root.left, root.right);
};
