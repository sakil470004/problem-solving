/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumMountainRemovals = function(nums) {
    const n = nums.length;
    const LIS = Array(n).fill(1);
    const LDS = Array(n).fill(1);

    // Step 1: Calculate LIS for each element from left to right
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                LIS[i] = Math.max(LIS[i], LIS[j] + 1);
            }
        }
    }

    // Step 2: Calculate LDS for each element from right to left
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j > i; j--) {
            if (nums[i] > nums[j]) {
                LDS[i] = Math.max(LDS[i], LDS[j] + 1);
            }
        }
    }

    // Step 3: Find the maximum length of a valid mountain array
    let maxMountainLength = 0;
    for (let i = 1; i < n - 1; i++) { // Peak cannot be the first or last element
        if (LIS[i] > 1 && LDS[i] > 1) { // Must have both increasing and decreasing parts
            maxMountainLength = Math.max(maxMountainLength, LIS[i] + LDS[i] - 1);
        }
    }

    // Step 4: Calculate minimum removals
    return n - maxMountainLength;
};
