//Udemy=>Jackson Kailath Teacher's course=> 50days leetcode=> module 14=> Coding Exercise: LIS => Maximum length of pair chain

// Coding Exercise: Max Length of Pair Chain
// You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.

// A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.

// Return the length longest chain which can be formed.

// You do not need to use up all the given intervals. You can select pairs in any order.



// Example 1:

// Input: pairs = [[2,3],[3,4],[4,5]]
// Output: 2
// Explanation: The longest chain is [2,3] -> [4,5].

// mynul solution run success . I am happy
var findLongestChain = function(pairs) {
    //Write code here 
    if(pairs.length<2) return pairs.length;
    
    let max=0;
    //  sort the array based on their 1st sub element
    pairs.sort((a,b)=>a[0]-b[0]);
    const helper=(index,currentMax,lastB)=>{
        // ? base case
        if(index===pairs.length ){
            max=Math.max(currentMax,max);
            return;
        }
        // ? recursive case
        // exclude
        helper(index+1,currentMax,lastB);
        // include
        if(lastB===-1 || lastB<pairs[index][0]){
            lastB=pairs[index][1];
            currentMax++;
            helper(index+1,currentMax,lastB)
        }
    }
    helper(0,0,-1)
    return max;
 
};
console.log(findLongestChain([[2,3],[3,4],[4,5]]))
