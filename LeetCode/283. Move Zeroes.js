// 283. Move Zeroes
// Easy
// Topics
// Companies
// Hint
// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

// Example 1:

// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Example 2:

// Input: nums = [0]
// Output: [0]

// Constraints:

// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1

// Follow up: Could you minimize the total number of operations done?

var moveZeroes = function (nums) {
  let first = 0;
  let last = first + 1;
  while (first < nums.length - 1) {
    if (nums[first] === 0 && nums[last] !== 0) {
      // swap them with next element
      [nums[first], nums[last]] = [nums[last], nums[first]];
      first = last;
      last++;
    } else if (nums[first] !== 0) {
      first++;
    } else {
      last++;
    }
  }
  return nums;
};
console.log(moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]
