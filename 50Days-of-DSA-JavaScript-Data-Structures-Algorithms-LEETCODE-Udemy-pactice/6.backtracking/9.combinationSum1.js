// combination sum 1
// https://leetcode.com/problems/combination-sum/
// ? Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
// ? The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different (you will not be given an empty candidates array).
// ! Example 1:
// ! Input: candidates = [2,3,6,7], target = 7
// ! Output: [[2,2,3],[7]]

const combinationSum = (candidates, target) => {
  let result = [];
  const helper = (i, subset, sum) => {
    // *base condition
    if (sum === target) {
      result.push([...subset]);
      return;
    }
    if (sum > target || i >= candidates.length) {
      return;
    }
    // *recursive condition
    
  };
  helper(0, [], 0);
  return result;
};

console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
