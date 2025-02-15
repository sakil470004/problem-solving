// Udemy=>Jackson Kailath Teacher's course=> 50days leetcode=> module 14=> LTS pair chain Russian Doll Envelopes
// You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.

// One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

// Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

// Note: You cannot rotate an envelope.

// Example :

// Input: envelopes = [[6,5],[7,5],[7,8],[3,4]]
// Output: 3
// Explanation: The maximum number of envelopes you can Russian doll is 3 ([3,4] => [6,5] => [7,8]).
// mynul approach
var maxEnvelopes = function(envelopes) {
    //Write code here 
    envelopes.sort((a,b) => a[0] - b[0]);
   
    let helper =(index,total,lastElementsIndex) => {
        // base case
        if(index===envelopes.length){
            return total;
        }
        // include the current envelope
        let max=0;
        if(lastElementsIndex===-1 || (envelopes[index][0]>envelopes[lastElementsIndex][0] && envelopes[index][1]>envelopes[lastElementsIndex][1])){
          max= helper(index+1,total+1,index);
        }
        // exclude the current envelope

        let max2= helper(index+1,total,lastElementsIndex);
        return Math.max(max,max2);
    }
   return  helper(0,0,-1);
    
};
console.log(maxEnvelopes([[6,5],[7,5],[7,8],[3,4]]));//3




