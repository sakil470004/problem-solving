// ? Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.

var minSubArrayLen = function (target, nums) {
  let min = Infinity;
  let right = 0;
  let sum = 0;
  let left = 0;
  while (right < nums.length) {
    sum += nums[right];
    while (sum >= target) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }
  return min == Infinity ? 0 : min;
};
const result = minSubArrayLen(
  213,
  [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12]
);
console.log(result); // 2
