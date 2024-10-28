// Coding Exercise: Target Sum
// You are given an integer array nums and an integer target.

// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

// For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".

// Return the number of different expressions that you can build, which evaluates to target.

// Example 1:

// Input: nums = [1,1,1,1], target = 2
// Output: 4
// Explanation: There are 4 ways to assign symbols to make the sum of nums be target 2.
// -1 + 1 + 1 + 1  = 2
// +1 - 1 + 1 + 1  = 2
// +1 + 1 - 1 + 1  = 2
// +1 + 1 + 1 - 1  = 2

// my solution
var findTargetSumWays = function (nums, target) {
    let resultCount = 0;
    const helper = (nums, target, index, sum) => {
        if (index === nums.length) {
            if (sum === target) {
                resultCount++;
            }
            return;
        }
        helper(nums, target, index + 1, sum + nums[index]);
        helper(nums, target, index + 1, sum - nums[index]);
    }
    helper(nums, target, 0, 0);
return resultCount;
};
console.log(findTargetSumWays([1, 1, 1, 1], 2)); // 4

// instructor solution 
var findTargetSumWays2 = function(nums, target) {
    const n = nums.length;
    const summation = nums.reduce((acc, num) => acc + num, 0);
    const dp = Array.from({ length: n }, () => Array(2 * summation + 1).fill(null));
 
    function helper(index, sum_nums) {
        // Base case
        if (index < 0) {
            return sum_nums === target ? 1 : 0;
        }
        if (dp[index][sum_nums + summation] !== null) {
            return dp[index][sum_nums + summation];
        }
 
        // Recurse with negative and positive additions of the current number
        const negative = helper(index - 1, sum_nums - nums[index]);
        const positive = helper(index - 1, sum_nums + nums[index]);
 
        // Store the result in dp and return
        dp[index][sum_nums + summation] = negative + positive;
        return dp[index][sum_nums + summation];
    }
 
    helper(n - 1, 0);
    console.log(dp);
};
console.log(findTargetSumWays2([1, 1, 1, 1], 2)); // 4