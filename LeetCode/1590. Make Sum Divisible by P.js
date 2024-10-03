// 1590. Make Sum Divisible by P
// Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.

// Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.

// A subarray is defined as a contiguous block of elements in the array.

// Example 1:

// Input: nums = [3,1,4,2], p = 6
// Output: 1
// Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
// Example 2:

// Input: nums = [6,3,5,2], p = 9
// Output: 2
// Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
// Example 3:

// Input: nums = [1,2,3], p = 3
// Output: 0
// Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.
var minSubarray = function(nums, p) {
    let totalSum = nums.reduce((a, b) => a + b, 0);
    let target = totalSum % p;
    
    if (target === 0) return 0; // If total sum is divisible by p, no need to remove any subarray
    
    let prefixSum = 0;
    let minLen = nums.length;
    let remainderMap = new Map();
    remainderMap.set(0, -1); // Initialize with remainder 0 at index -1
    
    for (let i = 0; i < nums.length; i++) {
        prefixSum = (prefixSum + nums[i]) % p;
        
        // We need to find a subarray whose sum is `target`
        let requiredRemainder = (prefixSum - target + p) % p;
        
        if (remainderMap.has(requiredRemainder)) {
            let subarrayLen = i - remainderMap.get(requiredRemainder);
            minLen = Math.min(minLen, subarrayLen);
        }
        
        // Store the current prefix sum remainder and index in the map
        remainderMap.set(prefixSum, i);
    }
    
    return minLen === nums.length ? -1 : minLen;
};


console.log(minSubarray([3, 1, 4, 2], 6)); // 1
console.log(minSubarray([6, 3, 5, 2], 9)); // 2
console.log(minSubarray([1, 2, 3], 7)); // 0

// mynul solution
var minSubarray2 = function (nums, p) {
    let sum = nums.reduce((a, b) => a + b, 0);
    let target = sum % p;
    if (target === 0) return 0;

    const helper = (target, subString, sum, index) => {
        if (sum % p === target) return subString.length;
        if (index === nums.length) return -1;
        const result = helper(target, subString, sum, index + 1);
        subString.push(nums[index]);
        const result2 = helper(target, subString, sum + nums[index], index + 1);
        subString.pop();
        if (result === -1) return result2;
        if (result2 === -1) return result;
        return Math.min(result, result2);
    }
    const result = helper(target, [], 0, 0);
    return result;
};