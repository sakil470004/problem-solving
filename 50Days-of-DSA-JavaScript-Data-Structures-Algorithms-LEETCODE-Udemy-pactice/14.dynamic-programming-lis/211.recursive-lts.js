
//Udemy=>Jackson Kailath Teacher's course=> 50days leetcode=> Coding Exercise: LIS => Longest Increasing Subsequence
// Given an integer array nums, return the length of the longest strictly increasing

// subsequence.



// Example 1:

// Input: nums = [300,9,2,5,3,7,500,400]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,500], 
// therefore the length is 4.

// mynul solution// is not working
var lengthOfLIS = function (nums) {
    //Write code here 
    let result = 0;
    let n = nums.length;
    let helper = (nums, index, prev, total) => {
        if (index === n - 1) {
            result = Math.max(result, total);
            return;
        }
        // include
        if (nums[index] > prev) {
            helper(nums, index + 1, nums[index], total + 1);
        }
        // exclude
        helper(nums, index + 1, prev, total);
    }
    helper(nums, 0, 0, 0);
    return result;

};
// recursive solution with instructor.
var lengthOfLIS = function (nums) {
    let n = nums.length;
    let helper = (curr, prev) => {
        if(curr >= n) return 0;
        // recursive case  
        let exclude = helper(curr + 1, prev);

        let include = 0;
        if(prev===-1 ||nums[curr] > prev) {
            include = 1 + helper(curr + 1, nums[curr]);
        }
        return Math.max(include, exclude);

    }
    return helper(0, -1);
}

console.log(lengthOfLIS([300, 9, 2, 5, 3, 7, 500, 400])); //4
