// Question 1: Unbounded Knapsack : You are given a set of N items, each with a weight and a value , represented by array wt and val respectively, and a knapsack with weight limit w. The task is to fill the knapsack in such a way that we can get the maximum profit. Return the maximum profit.
// Note : Each item can be taken any number of times.

function knapsack(N, W, val, wt) {
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
console.log(knapsack(3, 4, [1, 2, 3], [4, 5, 1])); // 3
