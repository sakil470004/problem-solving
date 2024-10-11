// 962. Maximum Width Ramp
// Medium
// Topics
// Companies
// A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.

// Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

 

// Example 1:

// Input: nums = [6,0,8,2,1,5]
// Output: 4
// Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
// Example 2:

// Input: nums = [9,8,1,0,1,9,4,0,4,1]
// Output: 7
// Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
 
var maxWidthRamp = function(A) {
    let stack = [];
    let maxWidth = 0;

    // Step 1: Build a stack with decreasing values of A
    for (let i = 0; i < A.length; i++) {
        if (stack.length === 0 || A[stack[stack.length - 1]] > A[i]) {
            stack.push(i);
        }
    }

    // Step 2: Traverse from the end and calculate the maximum ramp width
    for (let j = A.length - 1; j >= 0; j--) {
        while (stack.length > 0 && A[stack[stack.length - 1]] <= A[j]) {
            maxWidth = Math.max(maxWidth, j - stack.pop());
        }
    }

    return maxWidth;
};