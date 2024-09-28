// Coding Exercise: Combinations
// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

// You may return the answer in any order.

// Example:

// n = 4

// k=2

// Output =

// [

// [1,2],[1,3],[1,4],

// [2,3],[2,4],

// [3,4]

// ]

var combine = function (n, k) {
    let results = [];
    const helper = (start, subset) => {
        // base condition
        if (subset.length == k) {
            results.push(subset.slice());
            return;
        }
        for(let i=start;i<=n;i++){
            subset.push(i);
            helper(i+1, subset);
            subset.pop();
        }
    }
    helper(1, []);
    return results;
};

console.log(combine(4, 3)) // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
