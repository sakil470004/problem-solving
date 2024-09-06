// 172. Factorial Trailing Zeroes
// Given an integer n, return the number of trailing zeroes in n!.

// Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

 

// Example 1:

// Input: n = 3
// Output: 0
// Explanation: 3! = 6, no trailing zero.
// Example 2:

// Input: n = 5
// Output: 1
// Explanation: 5! = 120, one trailing zero.
// Example 3:

// Input: n = 0
// Output: 0
 

// Constraints:

// 0 <= n <= 104
 

// Follow up: Could you write a solution that works in logarithmic time complexity?
// ?my wrong answer
// var trailingZeroes = function(n) {
//     let factorial=1;
//     for(let i =n;i>=1;i--){
//         factorial=i*factorial;
        
//     }
//     console.log(`Factorial is `,factorial);
//     let count=0;
//     while(factorial%10===0){
//         count++;
//         factorial=factorial/10;
//     }
//     return count;
// };
var trailingZeroes = function(n) {
    let count = 0;
    while (n >= 5) {
        n = Math.floor(n / 5);
        count += n;
    }
    return count;
};

console.log(`Trailing Zeroes are `,trailingZeroes(30));