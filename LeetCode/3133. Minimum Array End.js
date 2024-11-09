// 3133. Minimum Array End
// You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.

// Return the minimum possible value of nums[n - 1].

 

// Example 1:

// Input: n = 3, x = 4

// Output: 6

// Explanation:

// nums can be [4,5,6] and its last element is 6.

// Example 2:

// Input: n = 2, x = 7

// Output: 15

// Explanation:

// nums can be [7,15] and its last element is 15.
/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function(n, x) {
    let bin1 = ("000000000000000000000000000"+toBin(x)).split("")
    let bin2 = toBin(n-1).split("")
    
    let idx = bin1.length-1
    while(bin2.length>0){
        if(bin1[idx]==0){
            let val = bin2.pop();
            bin1[idx]= val;
        }
        idx--;
    }
    
    let res = 0;
    let pow =1 ;
    for(let i=bin1.length-1; i>=0; i--){
        let dig = bin1[i];
        res+=dig*pow;
        pow*=2;
    }
    return res;
};

var toBin=(x)=>{
    str=""
    while(x>0){
        let d=x%2;
        str+=d;
        x=(x-d)/2;
    }
    return str.split("").reverse().join("");
}