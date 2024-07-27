// Q2. Find the Count of Numbers Which Are Not Special
// Medium
// 5 pt.
// You are given 2 positive integers l and r. For any number x, all positive divisors of x except x are called the proper divisors of x.

// A number is called special if it has exactly 2 proper divisors. For example:

// The number 4 is special because it has proper divisors 1 and 2.
// The number 6 is not special because it has proper divisors 1, 2, and 3.
// Return the count of numbers in the range [l, r] that are not special.

// Example 1:

// Input: l = 5, r = 7

// Output: 3

// Explanation:

// There are no special numbers in the range [5, 7].

// Example 2:

// Input: l = 4, r = 16

// Output: 11

// Explanation:

// The special numbers in the range [4, 16] are 4 and 9.

// Constraints:

// 1 <= l <= r <= 109
// Copyright ©️ 2024 LeetCode All rights reserved
// solve this problem using JavaScript
// You can write your code below
var nonSpecialCount = function (l, r) {
  let countNotSpecial = 0;
  for (let i = l; i <= r; i++) {
    let countDivisors = 0;
    for (let j = 1; j < i ; j++) {
      if (i % j === 0) {
        countDivisors++;
      }
    }
    if (countDivisors !== 2) {
      countNotSpecial++;
    }
  }
  return countNotSpecial;
};
const result = nonSpecialCount(5, 7);
console.log(result);
// this solution is wrong give me another solution
// solve this problem using JavaScript
// You can write your code below
