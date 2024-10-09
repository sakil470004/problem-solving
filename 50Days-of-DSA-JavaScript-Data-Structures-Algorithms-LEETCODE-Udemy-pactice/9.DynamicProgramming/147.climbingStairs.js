// Coding Exercise: Climbing Stairs
// You are climbing a staircase. It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// n>=1

// Example

// Input: n = 2
// Output: 2
// Explanation: You can climb to the top in 2 ways.
// A. 1 step + 1 step
// B. 2 steps

// memoization
var climbStairs2 = function (n) {
    const hash = {};
    const helper = (n) => {
        if (n in hash) return hash[n];
        if (n === 0) return 1;
        if (n < 0) return 0;
        hash[n] = helper(n - 1) + helper(n - 2);
        return hash[n];
    }
    helper(n);
    return hash[n];
};

// tabulation with space optimized
var climbStairs = function (n) {
    let a =1;
    let b=2;
    let c;
    if(n<=2) return n;
    for(let i=3; i<=n; i++){
        c = a+b;
        a = b;
        b = c;
    }
    return c;
}
console.log(climbStairs(10))
console.log(climbStairs2(10))