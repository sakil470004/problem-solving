
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
        if (curr >= n) return 0;
        // recursive case  
        let exclude = helper(curr + 1, prev);

        let include = 0;
        if (prev === -1 || nums[curr] > prev) {
            include = 1 + helper(curr + 1, nums[curr]);
        }
        return Math.max(include, exclude);

    }
    return helper(0, -1);
}
// recursive this memorization
var lengthOfLIS = function (nums) {
    let n = nums.length
    let dp = Array.from({ length: n }, () => Array(n + 1).fill(-1))

    // curr is index prev is value. don't confuse mynul
    let helper = (curr, prev) => {
        // base case
        if (curr >= n) return 0;
        // if the value is already calculated
        if (dp[curr][prev + 1] !== -1) { return dp[curr][prev + 1]; }
        // recursive case
        let exclude = helper(curr + 1, prev);
        let include = 0;
        if (prev === -1 || nums[curr] > nums[prev]) {
            include = 1 + helper(curr + 1, curr)
        }
        dp[curr][prev + 1] = Math.max(include, exclude);
        return dp[curr][prev + 1];
    }
    let result= helper(0, -1)
    // console.log(dp)
    return result;
}
// tabulation with instructor
var lengthOfLIS = function (nums) {
    const n=nums.length;
    const dp=Array.from({length:n+1},()=>Array(n+1).fill(0));
    for(let i=n-1;i>=0;i--){
        for(let j=i;j>=0;j--){
            let exclude=dp[i+1][j];
            
            let include=0;
            if(j-1===-1 || nums[i]>nums[j-1]){
                include=1+dp[i+1][i+1];
            }
            console.log('exclude',exclude,'exclude index',i+1,j,'include',include,'include index',i+1,i+1)
            dp[i][j]=Math.max(include,exclude);
            
        }
    }
    console.log(dp)
    return dp[0][0];
}

console.log(lengthOfLIS([1,2,3])); //4
// console.log(lengthOfLIS([300, 9, 2, 5, 3, 7, 500, 400])); //4
