// 1679. Max Number of K-Sum Pairs
// You are given an integer array nums and an integer k.

// In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.

// Return the maximum number of operations you can perform on the array.

// Example 1:
// Input: nums = [1,2,3,4], k = 5
// Output: 2
// Explanation: Starting with nums = [1,2,3,4]:
// - Remove numbers 1 and 4, then nums = [2,3]
// - Remove numbers 2 and 3, then nums = []
// There are no more pairs that sum up to 5, hence a total of 2 operations.
// Example 2:

// Input: nums = [3,1,3,4,3], k = 6
// Output: 1
// Explanation: Starting with nums = [3,1,3,4,3]:
// - Remove the first two 3's, then nums = [1,4,3]
// There are no more pairs that sum up to 6, hence a total of 1 operation.


var maxOperations = function(nums, k) {
    let operations = 0;
    let numCounts = new Map(); // Frequency map to track occurrences of numbers

    for (let num of nums) {
        let complement = k - num;

        // Check if the complement exists in the map and has a count > 0
        if (numCounts.get(complement) > 0) {
            operations++; // We've found a valid pair
            numCounts.set(complement, numCounts.get(complement) - 1); // Decrement the count of the complement
        } else {
            // If complement is not found, add the current number to the map
            numCounts.set(num, (numCounts.get(num) || 0) + 1);
        }
    }

    return operations;
};
// my solution but not working for all test cases some minor issues
var maxOperations2 = function (nums, k) {
    let operations = 0;
    const helper = (nums, k, j) => {
        if (nums.length === 0) return
        let jValue = nums[j];
        for (let i = j ; i < nums.length; i++) {
            const iValue = nums[i];
            // check if the number is found and it is not the same number
            if (iValue + jValue === k && i !== j) {
                nums.splice(j, 1);
                nums.splice(i, 1);
                operations++;
                helper(nums, k, i );
                break;
            }
        };
    }
    helper(nums, k, 0);
    return operations;
};

console.log(maxOperations([1,2,3,4], 5)) // 2