var rob = function(nums) {
    let n=nums.length;
    if(n==0) return 0;
    if(n==1) return nums[0];
    if(n==2) return Math.max(nums[0],nums[1]);
    let result=0;
    let memo={};
    let helper=(index,sum)=>{
        if(index>=n){
            result=Math.max(result,sum);
            return;
        }
        if(memo[index]) return;
        memo[index]=true;
        helper(index+1,sum);
        helper(index+2,sum+nums[index]);

    }
    helper(0,0);
    return result;
};