// 739. Daily Temperatures
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

 

// Example 1:

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
// Example 2:

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
// Example 3:

// Input: temperatures = [30,60,90]
// Output: [1,1,0]
var dailyTemperatures = function(temperatures) {
    let n=temperatures.length;
    let result=new Array(n).fill(0);
    let helper = (index)=>{
        for(let i=index+1;i<n;i++){
            if(temperatures[i]>temperatures[index]){
                result[index]=i-index;
                return;
            }
        }
    }
    for(let i=0;i<n;i++){
        helper(i);
    }
    return result;
};
// this solution is not working .it is time limit exceeded
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));//[1,1,4,2,1,1,0,0]

var dailyTemperatures = function(temperatures) {
    let n=temperatures.length;
    let result=new Array(n).fill(0);
    let stack=[];
    for(let i=0;i<n;i++){
        while(stack.length>0 && temperatures[i]>temperatures[stack[stack.length-1]]){
            let index=stack.pop();
            result[index]=i-index;
        }
        stack.push(i);
    }
    return result;
}
// beats 56.15% leetcode