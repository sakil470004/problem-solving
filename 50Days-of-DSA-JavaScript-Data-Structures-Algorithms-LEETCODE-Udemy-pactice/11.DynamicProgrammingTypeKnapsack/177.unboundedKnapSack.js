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
function knapSack(N, W, val, wt) {
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

console.log(knapSack(2, 3, [4, 2], [3, 1])); // 3
