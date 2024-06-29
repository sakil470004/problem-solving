var getAncestors = function(n, edges) {
    let ancestorNodes = new Array(n).fill(0).map(() => new Set());
    let adjList = new Array(n).fill(0).map(() => []);
    
    // Build adjacency list// v is index which is node 
    for (let [u, v] of edges) {
        adjList[v].push(u);
    }
    console.log(adjList)
    // Function to perform DFS and gather ancestors
    function dfs(node, ancestors) {
        for (let parent of adjList[node]) {
            // if parent is not in ancestors then add parent to ancestors and call dfs function for new parent
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

const result = getAncestors(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]);
console.log(result);
