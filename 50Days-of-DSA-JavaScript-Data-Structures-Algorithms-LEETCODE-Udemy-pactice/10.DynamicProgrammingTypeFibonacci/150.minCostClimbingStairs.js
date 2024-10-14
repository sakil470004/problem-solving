// Coding Exercise: Minimum Cost Climbing Stairs
// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

// You can either start from the step with index 0, or the step with index 1.

// Return the minimum cost to reach the top of the floor.

// Example 1:

// Input: cost = [10,20,30]
// Output: 20
// Explanation: You will start at index 1.
// - Pay 20 and climb two steps
//mynul own
var minCostClimbingStairs = function (cost) {
    let n = cost.length;
    let dp = Array(n + 1).fill(0);
    let min = 0;
    const helper = (index) => {
        if (index >= n) {
            return 0;
        }
        if (dp[index] > 0) {
            return dp[index];
        }
        const oneStep= cost[index] + helper(index + 1);
        const twoStep = cost[index] + helper(index + 2);
        dp[index] = Math.min(oneStep,twoStep)
        return dp[index];
    }
    return Math.min(helper(0, 0), helper(1, 0));

};
console.log(minCostClimbingStairs([10, 20, 30])) //20
