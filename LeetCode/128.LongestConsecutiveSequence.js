// ? 128. Longest Consecutive Sequence
//? Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

//? You must write an algorithm that runs in O(n) time.

//! Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
//! Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
//! Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;

    // Sort the array
    nums.sort((a, b) => a - b);

    let maxLength = 1;
    let currentLength = 1;

    // Iterate through the sorted array
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) { // Check if it's not a duplicate
            if (nums[i] === nums[i - 1] + 1) { // Check if it's a consecutive number
                currentLength += 1;
            } else {
                maxLength = Math.max(maxLength, currentLength);
                currentLength = 1; // Reset the current length counter
            }
        }
    }

    // Final update to maxLength in case the longest sequence is at the end
    return Math.max(maxLength, currentLength);
};
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]));
