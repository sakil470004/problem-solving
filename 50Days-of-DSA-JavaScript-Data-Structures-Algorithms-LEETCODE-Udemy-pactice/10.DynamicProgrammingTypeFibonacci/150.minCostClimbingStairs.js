// Coding Exercise: Minimum Cost Climbing Stairs
// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

// You can either start from the step with index 0, or the step with index 1.

// Return the minimum cost to reach the top of the floor.

// Example 1:

// Input: cost = [10,20,30]
// Output: 20
// Explanation: You will start at index 1.
// - Pay 20 and climb two steps
//mynul own //recursive with memo
var minCostClimbingStairs1 = function (cost) {
    let n = cost.length;
    let dp = Array(n + 1).fill(0);
    const helper = (index) => {
        if (index >= n) {
            return 0;
        }
        if (dp[index] > 0) {
            return dp[index];
        }
        const oneStep = cost[index] + helper(index + 1);
        const twoStep = cost[index] + helper(index + 2);
        dp[index] = Math.min(oneStep, twoStep)
        return dp[index];
    }
    return Math.min(helper(0, 0), helper(1, 0));

};
// only recursive
var minCostClimbingStairs2 = function (cost) {
    let n = cost.length;
    const helper = (index) => {
        //base case . if index is greater than or equal to n then return 0
        if (index >= n) {
            return 0;
        }
        const oneStep = cost[index] + helper(index + 1);
        const twoStep = cost[index] + helper(index + 2);
        return Math.min(oneStep, twoStep)
    }
    return Math.min(helper(0, 0), helper(1, 0));

};
// recursive memorization /top down approach
var minCostClimbingStairs3 = function (cost) {
    let n = cost.length;
    const dp = Array(n + 1).fill(-1);
    const helper = (index) => {
        //base case . if index is greater than or equal to n then return 0
        if (index >= n) {
            return 0;
        }
        if (dp[index] !== -1) {
            return dp[index];
        }
        const oneStep = cost[index] + helper(index + 1);
        const twoStep = cost[index] + helper(index + 2);
        dp[index] = Math.min(oneStep, twoStep)
        return dp[index];
    }
    return Math.min(helper(0, 0), helper(1, 0));

};
//mynul tabulation / bottom up approach
var minCostClimbingStairs4 = function (cost) {
    let n=cost.length;
    // so in i-1 ,i-2 we have included both the cost of reaching that step and the cost of that step// i-1 and i-2 are the steps we are considering to reach ith step
    let dp=Array(n+1).fill(0);
    dp[0]=cost[0];
    dp[1]=cost[1];
    for(let i=2;i<n;i++){
        let oneStep=cost[i]+dp[i-1];
        let twoStep=cost[i]+dp[i-2];
        dp[i]=Math.min(oneStep,twoStep);
    console.log(dp)
    }
    return Math.min(dp[n-1],dp[n-2]);
}
//tabulation / bottom up approach
var minCostClimbingStairs5 = function (cost) {
    let n=cost.length;
    //storing the cost of reaching ith step store in dp[i]. and dp[n] will be the cost of reaching the top// beond last index
    let dp=Array(n+1).fill(0);
    for(let i=2;i<=n;i++){
        let costToComeOneStepBack=dp[i-1]+cost[i-1];
        let costToComeTwoStepBack=dp[i-2]+cost[i-2];
        dp[i]=Math.min(costToComeOneStepBack,costToComeTwoStepBack);
    }
    return dp[n];
}
console.log(minCostClimbingStairs4([10, 20, 30,10,30,5,10])) 
console.log(minCostClimbingStairs5([10, 20, 30,10,30,5,10])) 
