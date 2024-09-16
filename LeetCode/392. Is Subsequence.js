
// Code
// Testcase
// Testcase
// Test Result
// 392. Is Subsequence
// Solved
// Easy
// Topics
// Companies
// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

 

// Example 1:

// Input: s = "abc", t = "ahbgdc"
// Output: true
// Example 2:

// Input: s = "axc", t = "ahbgdc"
// Output: false
 

// Constraints:

// 0 <= s.length <= 100

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    const letters = s.split("");
    const mainString=t.split('');
    let count = 0;
    const len=letters.length;    
    const mainLen=mainString.length;
      for (let i = 0; i < mainLen; i++) {
          if (letters[count] === mainString[i]) {
              
          count++;
          }
      }
    return count === len;
  };