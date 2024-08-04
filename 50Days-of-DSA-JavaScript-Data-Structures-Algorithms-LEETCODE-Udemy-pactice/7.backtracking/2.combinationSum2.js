// ? Combination Sum 2
//? Given a collection of candidate numbers (candidates) and a target number(target), find all unique combinations in candidates where the candidate numbers sum to target.
//? Each number in candidates may only be used once in the combination.
//? Note : The solution set must not contain duplicate combinations

// ! Example -
// ! Input : candidates =[3,5,2,1,3] => target =7 => output : [[1,3,3],[5,2]]

var combinationSum2 = function (candidates, target) {
  let res = [];
  console.log("candidates:", candidates, "target:", target);
  candidates.sort((a, b) => a - b);

  function backtrack(index, currSum, curr) {
    // ? base condition
    if (currSum === target) {
      res.push([...curr]); //make a copy of curr to store in res
      return;
    }
    if (currSum > target || index > candidates.length - 1) {
      return;
    }

    //    ? recursive case
    let hash = {}; //object to keep track of elements used at this level of recursion
    for (let j = index; j < candidates.length; j++) {
      if (!hash[candidates[j]]) {
        hash[candidates[j]] = true;
        curr.push(candidates[j]);
        backtrack(j + 1, currSum + candidates[j], curr); //? Recursive call without allowing the same index;
        curr.pop(); //? backtracking
      }
    }
  }

  backtrack(0, 0, []); //! start recursive function with init condition
  return res;
};

console.log(combinationSum2([3, 5, 2, 1, 3], 7)); // [[1,3,3],[5,2]]
console.log(combinationSum2([2, 3, 2, 7], 7)); // [[2,2,3],[7]]
console.log(combinationSum2([1, 1, 1, 1, 2, 2], 4));
