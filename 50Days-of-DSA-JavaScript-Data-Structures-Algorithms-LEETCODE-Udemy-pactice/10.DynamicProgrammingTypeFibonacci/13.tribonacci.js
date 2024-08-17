// Question 2: Tribonacci: The Tribonacci sequence Tn is defined as follows:

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.
// Example 1:
// Input: n = 4
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
// Example 2:
// Input: n = 25
// Output: 1389537
// Constraints:
// 0 <= n <= 37
// get question from leetcode: https://leetcode.com/problems/n-th-tribonacci-number/

var tribonacci = function (n) {
  let hash = Array(n + 1).fill(-1);
  hash[0] = 0;
  hash[1] = 1;
  hash[2] = 1;
  if (n <= 2) return hash[n];
  function helper(n) {
    if (hash[n] !== -1) return hash[n];
    hash[n] = helper(n - 1) + helper(n - 2) + helper(n - 3);
    return hash[n];
  }

  return helper(n);
};
console.log(tribonacci(25)); // 4
