var getAncestors = function(n, edges) {
    let ancestorNodes = new Array(n).fill(0).map(() => new Set());
    let adjList = new Array(n).fill(0).map(() => []);
    
    // Build adjacency list
    for (let [u, v] of edges) {
        adjList[v].push(u);
    }
    
    // Function to perform DFS and gather ancestors
    function dfs(node, ancestors) {
        for (let parent of adjList[node]) {
            if (!ancestors.has(parent)) {
                ancestors.add(parent);
                dfs(parent, ancestors);
            }
        }
    }
    
    // Find ancestors for each node
    for (let i = 0; i < n; i++) {
        dfs(i, ancestorNodes[i]);
    }
    
    // Convert sets to sorted arrays
    let result = ancestorNodes.map(ancestors => Array.from(ancestors).sort((a, b) => a - b));
    
    return result;
};

const result = getAncestors(9, [[3,6],[2,4],[8,6],[7,4],[1,4],[2,1],[7,2],[0,4],[5,0],[4,6],[3,2],[5,6],[1,6]]);
console.log(result);
