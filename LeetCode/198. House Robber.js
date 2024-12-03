// 198. House Robber
// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

// Example 1:

// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.
// Example 2:

// Input: nums = [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.

var rob = function(nums) {
    let n=nums.length;
    if(n==0) return 0;
    if(n==1) return nums[0];
    if(n==2) return Math.max(nums[0],nums[1]);
    let result=0;
    let memo = new Array(n).fill(-1);
    let helper=(index,sum)=>{
        if(index>=n){
            result=Math.max(result,sum);
            memo[index]=sum;
            return;
        }
        if(memo[index]!=-1){
            result=Math.max(result,sum+memo[index]);
            return;
        }
        helper(index+1,sum);
        helper(index+2,sum+nums[index]);

    }
    helper(0,0);
    return result;
};

var rob = function(nums) {
    let n=nums.length;
    if(n==0) return 0;
    if(n==1) return nums[0];
    if(n==2) return Math.max(nums[0],nums[1]);
    let dp = new Array(n).fill(0);
    dp[0]=nums[0];
    dp[1]=Math.max(nums[0],nums[1]);
    for(let i=2;i<n;i++){
        dp[i]=Math.max(dp[i-1],dp[i-2]+nums[i]);
    }
    return dp[n-1];
}
console.log(rob([1,2,3,1]));//4
// beat leadcode 100% 