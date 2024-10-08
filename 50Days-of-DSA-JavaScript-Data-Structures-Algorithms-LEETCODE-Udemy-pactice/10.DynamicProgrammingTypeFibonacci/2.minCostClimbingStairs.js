// Min Cost Climbing Stairs
// ? You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.Length of cost will be in the range [2, 1000].Every cost[i] will be an integer that will be in the range [0, 999].
//give leetcode link    https://leetcode.com/problems/min-cost-climbing-stairs/

// ! Ex: Input: cost = [10, 15, 20] Output: 15 Explanation: Cheapest is: start on cost[1], pay that cost, and go to the top.
// this is a fibonacci series problem // it uses the concept of dynamic programming
var minCostClimbingStairs1 = function (cost) {
  let n = cost.length;

  function helper(index) {
    if (index >= n) return 0;

    let oneStep = cost[index] + helper(index + 1);
    let twoStep = cost[index] + helper(index + 2);
    return Math.min(oneStep, twoStep);
  }
  //   as i can start from 0 or 1, i will take the minimum of both
  return Math.min(helper(0), helper(1));
};

// memorization// it reduces the time complexity
var minCostClimbingStairs2 = function (cost) {
  let n = cost.length;

  const memo = Array(n).fill(-1);

  function helper(index) {
    // base condition
    if (index >= n) return 0;

    // if already calculated
    if (memo[index] !== -1) return memo[index];
    // recursive case
    let oneStep = cost[index] + helper(index + 1);
    let twoStep = cost[index] + helper(index + 2);
    memo[index] = Math.min(oneStep, twoStep);
    return memo[index];
  }
  //   as i can start from 0 or 1, i will take the minimum of both
  return Math.min(helper(0), helper(1));
};

// tabulation/ Bottum up approach //storing the cost for reaching ith step from 0th step
var minCostClimbingStairs = function (cost) {
  let n = cost.length;
  // storing the cost for reaching ith step from 0th step
  let dp = Array(n + 1).fill(0); //return dp[n] 0 to n-1

  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    let costToComeFromOneStepBack = cost[i - 1] + dp[i - 1];
    let costToComeFromTwoStepBack = cost[i - 2] + dp[i - 2];
    dp[i] = Math.min(costToComeFromOneStepBack, costToComeFromTwoStepBack);
  }
  //  as i can start from 0 or 1, i will take the minimum of both to reach the top floor from 0th or 1st step
  return dp[n];
};
console.log(minCostClimbingStairs([10, 15, 20])); // 15
