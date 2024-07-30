// ? Given an integer array nums that may contain duplicates, return all possible subset(the power set). The solution set must not contain duplicate subsets. Return the solution in any order.
//! Example =>[1,2,2]=> [[],[1],[1,2],[1,2,2],[2],[2,2]];
// ! there is 2 ways solution 1.Iteratively 2.Recursively

const subsetWithDuplicate = function (nums) {
  let res = [];
  //? =>sort //so that all the same number side by side
  nums.sort((a, b) => a - b);
  function subsets(index, curr) {
    //* base case
    if (index === nums.length) {
      res.push([...curr]);
      return;
    }
    //* recursive case
    //?include
    curr.push(nums[index]);
    subsets(index + 1, curr);
    curr.pop(); //*backtracking
    //?exclude
    // 1,3,3,3,7
    while (index < nums.length - 1 && nums[index] === nums[index + 1]) {
      index++;
    }
    // index=3
    subsets(index + 1, curr);
  }
  subsets(0, []);
  return res;
};

const result = subsetWithDuplicate([1, 2, 2]);
console.log(result);
