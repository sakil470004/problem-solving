// 1. Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.
var twoSum = function (nums, target) {
  //? create a hash
  let hash = {};
  //? loop through the array
  for (let i = 0; i < nums.length; i++) {
    // console.log(hash);
    if (!hash[nums[i]]) {
      hash[nums[i]] = [i];
    } else {
      hash[nums[i]] = [...hash[nums[i]], i];
    }
  }
  // sort the array
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (nums[left] + nums[right] === target) {
      if (nums[left] !== nums[right]) {
        const leftArray = hash[nums[left]];
        const rightArray = hash[nums[right]];
        return [leftArray[0], rightArray[0]];
      } else {
        return [hash[nums[left]][0], hash[nums[left]][1]];
      }
    } else if (nums[left] + nums[right] > target) {
      right--;
    } else {
      left++;
    }
  }
  return [];
};
console.log(twoSum([2, 7, 11, 15], 9));
