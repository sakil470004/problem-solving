// Coding Exercise: Unbounded Knapsack
// Given a set of N items, each with a weight and a value, represented by the array w and val respectively. Also, a knapsack with weight limit W.

// The task is to fill the knapsack in such a way that we can get the maximum profit. Return the maximum profit.

// Note: Each item can be taken any number of times.



// Input: 
// N = 2
// W = 3
// val = [4, 2]
// wt = [3, 1]
// Output: 3
// Explanation: 
// 1.Pick the 2nd element thrice.
// So, Total value = 2 + 2 + 2 = 6. and the total weight = 1 + 1 + 1  = 3 
// which is <= 3.
// recursive solution
function knapSack1(N, W, val, wt) {
    // Base Case: If the knapsack weight limit is 0 or no items are left
    if (W === 0 || N === 0) {
        return 0;
    }

    // Recursive function to solve Unbounded Knapsack problem
    const knapSackRecursive = (W, val, wt, N) => {
        // Base Case: If the knapsack weight limit is 0 or no items are left
        if (W === 0 || N === 0) {
            return 0;
        }

        // If weight of the nth item is more than Knapsack capacity W, it cannot be included
        if (wt[N - 1] > W) {
            return knapSackRecursive(W, val, wt, N - 1);
        }

        // Return the maximum value obtained by either:
        // 1. Including the nth item and allowing the same item to be included again (unbounded)
        // 2. Not including the nth item and moving to the next
        return Math.max(
            val[N - 1] + knapSackRecursive(W - wt[N - 1], val, wt, N),
            knapSackRecursive(W, val, wt, N - 1)
        );
    };

    // Calling the recursive function
    return knapSackRecursive(W, val, wt, N);
}
// tabulation
function knapSack(N, W, val, wt) {
    // dp array N+1 rows W+1 columns//fill dp with 0
    const dp = Array.from({ length: N + 1 }, () => Array(W + 1).fill(0));

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= W; j++) {
            const exclude = dp[i - 1][j];
            let include = 0;
            // if weight of current item is less than or equal to current weight// wt and val array is 0 based index
            if (wt[i - 1] <= j) {
                include = val[i - 1] + dp[i][j - wt[i - 1]];
            }
            dp[i][j] = Math.max(include, exclude);
        }
    }
    return dp[N][W];
}

console.log(knapSack1(2, 3, [4, 2], [3, 1])); // 3
console.log(knapSack(2, 3, [4, 2], [3, 1])); // 3
