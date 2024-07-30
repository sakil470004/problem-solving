// ? Given an integer array of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. return the solution in any order.
// *test case=> [1,7] . powerset=[[],[1],[7],[1,7]]=>(2^n)
//! there is 2 ways solution 1.Iteratively 2.Recursively

const powerSet = function (nums) {
  const output = [];
  const helper = function (nums, i, subsets) {
    //*    base condition
    if (i === nums.length) {
      output.push(subsets.slice());
      return;
    }
    // * recursive condition
    //? don't add //exclude
    helper(nums, i + 1, subsets);
    // ? add element //include
    subsets.push(nums[i]); //? add ith index item to subset;
    helper(nums, i + 1, subsets);
    subsets.pop(); //backtracking line
  };
  helper(nums, 0, []);
  return output;
};
const result = powerSet([1, 2, 3]);
console.log(result);
