// Coding Exercise: Partition Equal Subset Sum
// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.



// Example 1:

// Input: nums = [1,5,20,14]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 14] and [20].

// my solution

var canPartition = function(nums) {
    const total = nums.reduce((acc, num) => acc + num, 0);
    if (total % 2 !== 0) {
        return false;
    }
    const target = total / 2;
    const n = nums.length;
    const dp = Array.from({ length: n }, () => Array(target + 1).fill(null));
    function helper(index, sum_nums) {
        if (sum_nums === target) {
            return true;
        }
        if (index === n || sum_nums > target) {
            return false;
        }
        if (dp[index][sum_nums] !== null) {
            return dp[index][sum_nums];
        }
        const include = helper(index + 1, sum_nums + nums[index]);
        const exclude = helper(index + 1, sum_nums);
        dp[index][sum_nums] = include || exclude;
        return dp[index][sum_nums];
    }
    return helper(0, 0);
};
// instructor solution
var canPartition = function(nums) {
    const n = nums.length;
    let sum = nums.reduce((acc, num) => acc + num, 0);
    if (sum % 2 !== 0) return false; // If the total sum is odd, it's impossible to split into two equal sum parts.
 
    const target = sum / 2;
    let prev = Array(target + 1).fill(false);
    let curr = Array(target + 1).fill(false);
    prev[0] = true; // There's always a way to make sum 0 (by choosing no elements).
    curr[0] = true;
 
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
            if (nums[i - 1] <= j) {
                // If the current number can be part of the subset, consider it (pick)
                curr[j] = prev[j - nums[i - 1]];
            } else {
                curr[j] = false; // If the current number is greater than the sum we're trying to make, we can't pick it.
            }
            // Whether we pick or don't pick the number, update current[j]
            curr[j] = curr[j] || prev[j];
        }
        prev = [...curr]; // Update the previous row for the next iteration
    }
    return curr[target]; // If we can achieve the 'target' sum, then we can partition the array as required.
};