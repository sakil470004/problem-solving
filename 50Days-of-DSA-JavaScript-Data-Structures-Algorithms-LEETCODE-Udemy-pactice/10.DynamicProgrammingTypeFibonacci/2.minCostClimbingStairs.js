// Min Cost Climbing Stairs
// ? You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.Length of cost will be in the range [2, 1000].Every cost[i] will be an integer that will be in the range [0, 999].
//give leetcode link    https://leetcode.com/problems/min-cost-climbing-stairs/

// ! Ex: Input: cost = [10, 15, 20] Output: 15 Explanation: Cheapest is: start on cost[1], pay that cost, and go to the top.

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

// memorization
var minCostClimbingStairs = function (cost) {
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

console.log(minCostClimbingStairs([10, 15, 20])); // 15
