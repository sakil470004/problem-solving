// ? In the Fibonacci Sequence, each subsequent term is obtained by adding the preceding two terms. The is true for all the numbers except the first two terms, which are 0 and 1. F(n)=F(n-1)+F(n-2) for n>1, where F(n) is the nth term of the Fibonacci Sequence.

// leetcode
// https://leetcode.com/problems/fibonacci-number/
// * for approach
// 1. Recursion
// 2. Recursion with Memoization// Top-Down Approach
// 3. Bottom-Up Approach// Tabulation
// 4. Bottom-Up Approach with Space Optimization

// memoization
var fib3 = function (n) {
  let memo = {
    0: 0,
    1: 1,
  };
  function calculateFib(num) {
    // ? base condition fi it on memo
    if (memo[num] !== undefined) {
      return memo[num];
    }
    memo[num] = calculateFib(num - 1) + calculateFib(num - 2);
    return memo[num];
  }
  return calculateFib(n);
};

// ? mynul code
var fib2 = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fib2(n - 1) + fib2(n - 2);
};
// tabulation
var fib = function (n) {
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  if (n > 0) {
    dp[1] = 1;
  }
  let count = 1;
  while (count < n) {
    count++;
    dp[count] = dp[count - 1] + dp[count - 2];
  }
  return dp[n];
};
// space optimization tabulation
var fib4 = function (n) {
  if (n === 0 || n === 1) {
    return n;
  }

  let prev = 0;

  let curr = 1;

  let count = 1;
  while (count < n) {
    count++;
    let next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
};

console.log(fib4(41));
console.log(fib(41));
console.log(fib3(41));
console.log(fib2(41));
