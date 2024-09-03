// 22. Generate Parentheses
// Medium
// Topics
// Companies
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

var generateParenthesis = function (n) {
  const result = [];

  const helper = (subString, open, close) => {
    // *base condition
    if (subString.length === 2 * n) {
      result.push(subString);
      return;
    }
    // *recursive condition
    // ?for open bracket we can add n times
    if (open < n) {
      helper(subString + "(", open + 1, close);
    }
    // ?for close bracket we can add n times
    if (close < open) {
      helper(subString + ")", open, close + 1);
    }
  };
  helper("", 0, 0);

  return result;
};

// *test cases
console.log(generateParenthesis(3)); //["((()))","(()())","(())()","()(())","()()()"]
