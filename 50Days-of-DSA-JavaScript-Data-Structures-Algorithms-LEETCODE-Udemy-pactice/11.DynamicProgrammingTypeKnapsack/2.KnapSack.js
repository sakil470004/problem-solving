// Question
// Question 1: 01 Knapsack: You are provided with a set of N items, each with a specified weight and value. Your objective is to pack these items into a backpack with a weight limit of W, maximizing the total value of items in the backpack. Specifically, you have two arrays: val[0..N-1], representing the values of the items, and wt[0..N-1], indicating their weights. Additionally, you have a weight limit W for the backpack. The challenge is to determine the most valuable combination of items where the total weight does not exceed W. Note that each item is unique and indivisible, meaning it must be either taken as a whole or left entirely.

// get link from leetcode
// https://leetcode.com/problems/01-knapsack/
// general approach
function KnapSack1(W, wt, val, n) {
  function helper(index, remWeight) {
    //? base case
    if (index >= n || remWeight === 0) {
      return 0;
    }

    //? recursive case
    // exclude the current item
    let exclude = helper(index + 1, remWeight);
    // include the current item
    let include = 0;
    if (wt[index] <= remWeight) {
      include = val[index] + helper(index + 1, remWeight - wt[index]);
    }
    return Math.max(include, exclude);
  }
  return helper(0, W);
}

//? time complexity is O(2^n) and space complexity is O(n)
//? optimized approach// memoization | top-down approach
//? time complexity is O(n*W) and space complexity is O(n*W)
function KnapSack2(W, wt, val, n) {
  // n rows and w+1 columns//fill with -1
  const dp = Array.from({ length: n }, () => Array(W + 1).fill(-1));
  function helper(index, remWeight) {
    //? base case
    if (index >= n || remWeight === 0) {
      return 0;
    }
    // if it not in dp then calculate and store it in dp
    if (dp[index][remWeight] !== -1) {
      return dp[index][remWeight];
    }
    //? recursive case
    // exclude the current item
    let exclude = helper(index + 1, remWeight);
    // include the current item
    let include = 0;
    if (wt[index] <= remWeight) {
      include = val[index] + helper(index + 1, remWeight - wt[index]);
    }
    dp[index][remWeight] = Math.max(include, exclude);
    return dp[index][remWeight];
  }
  return helper(0, W);
}
