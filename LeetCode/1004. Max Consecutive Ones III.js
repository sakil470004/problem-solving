// 1004. Max Consecutive Ones III
// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.



// Example 1:

// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Output: 6
// Explanation: [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
// Example 2:

// Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
// Output: 10
// Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

var longestOnes = function(nums, k) {
    let start = 0;
    let maxOnes = 0;
    let zeroCount = 0;
    
    for(let end = 0; end < nums.length; end++) {
        // Count zeros in current window
        if(nums[end] === 0) zeroCount++;
        
        // Shrink window if too many zeros
        while(zeroCount > k) {
            if(nums[start] === 0) zeroCount--;
            start++;
        }
        
        // Update max consecutive ones
        maxOnes = Math.max(maxOnes, end - start + 1);
    }
    
    return maxOnes;
 };
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)) // 6