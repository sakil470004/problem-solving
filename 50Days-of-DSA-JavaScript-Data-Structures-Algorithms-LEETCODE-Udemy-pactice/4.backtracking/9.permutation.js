// ? given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
//! if array is given to us is => [1,2,3] the possible ans is [1,2,3] & [1,3,2] & [2,1,3] & [2,3,1] & [3,1,2] & [3,2,1]
//* write a function that takes an array of distinct integers and returns all the possible permutations of the array.
// for 3 number 3! for 4 number 4!;
//? clarifying question.
// ? What if nums is empty ?=> should I return an empty array

var permute = function(nums)  {
  let res = [];
  let n = nums.length;
  function helper(i) {
    //* base case
    if (i === n - 1) {
      res.push([...nums]);
      return;
    }
    // * recursive case
    for (let j = i; j < n ; j++) {
      // ?swap element;
      [nums[i], nums[j]] = [nums[j], nums[i]];
      //? recursive to the branch
      helper(i + 1);
      //? backtracking to the branch as it's previous state// revert changes for to fix array
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  helper(0);
  return res;
};

const result = permute([1, 2, 3]);
console.log(result);
