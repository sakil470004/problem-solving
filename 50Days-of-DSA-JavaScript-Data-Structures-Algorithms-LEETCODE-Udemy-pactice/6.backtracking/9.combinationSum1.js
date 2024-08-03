// combination sum 1
// https://leetcode.com/problems/combination-sum/
// ? Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
// ? The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different (you will not be given an empty candidates array).
// ! Example 1:
// ! Input: candidates = [2,3,6,7], target = 7
// ! Output: [[2,2,3],[7]]
//! my solution
const combinationSumOld = (candidates, target) => {
  let result = [];
  const helper = (i, subset, sum) => {
    // *base condition
    if (sum === target) {
      result.push([...subset]);
      return;
    }
    // if sum greater so we don't need any cantrided on this branch
    if (sum > target || i >= candidates.length) {
      return;
    }
    // *recursive condition
    for (let j = i; j < candidates.length; j++) {
      subset.push(candidates[j]); //push element move to subset to that we can
      helper(j, subset, sum + candidates[j]); //recursive to the branch
      subset.pop(); //backtracking
    }
  };
  helper(0, [], 0);
  return result;
};

// ? instructor code
var combinationSum = function (candidates, target) {
  let results = [];
  function helper(index, curr, currSum) {
    if (currSum > target) {
      return;
    }
    if (currSum === target) {
      results.push([...curr]);
      return;
    }
    for (let j = index; j < candidates.length; j++) {
      curr.push(candidates[j]);
      helper(j, curr, currSum + candidates[j]);
      curr.pop();
    }
  }
  helper(0, [], 0);
  return results;
};
console.log(combinationSumOld([2, 3, 4, 7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 4, 7], 7)); // [[2,2,3],[7]]
