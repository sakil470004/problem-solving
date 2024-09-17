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
  let count = 0;
  const len = nums.length;
  // move all non-zero elements to the front
  for (let i = 0; i < len; i++) {
    if (nums[i] !== 0) {
      nums[count] = nums[i];
      count++;
    }
  }
  // fill the remaining elements with 0
  for (let i = count; i < len; i++) {
    nums[i] = 0;
  }
  return nums;
};
console.log(moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]
