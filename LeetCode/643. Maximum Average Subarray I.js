// 643. Maximum Average Subarray I
// You are given an integer array nums consisting of n elements, and an integer k.

// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.



// Example 1:

// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
// Example 2:

// Input: nums = [5], k = 1
// Output: 5.00000
function findMaxAverage(nums, k) {
    // Helper function to calculate the sum of the first 'k' elements
    function calculateSum(index, k) {
        if (k === 0) return 0; // Base case: no more elements to add
        return nums[index] + calculateSum(index + 1, k - 1); // Recursive call
    }

    // Recursive function to find the maximum average
    function findMax(index, currentSum, maxSum) {
        if (index === nums.length) return maxSum; // Base case: reached the end of the array

        // Calculate new sum by removing the previous element and adding the new element
        const newSum = currentSum - nums[index - k] + nums[index];
        maxSum = Math.max(maxSum, newSum); // Update maxSum if newSum is greater

        // Recur for the next index
        return findMax(index + 1, newSum, maxSum);
    }

    // Initial calculation for the first subarray of length 'k'
    const initialSum = calculateSum(0, k);
    
    // Start recursion to find the maximum sum
    const maxSum = findMax(k, initialSum, initialSum);

    // Return the maximum average
    return maxSum / k;
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75