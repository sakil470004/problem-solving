let memo = {
    "0": 0,
    "1": 1
};
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function feboRecursion(n){
//    if n is in memo, return the value from memo
    if(n in memo){
        return memo[n];
    }
    // base case: if n is less than 2, return n and store it in memo
    if(n<2){
        memo[n] = n;
        return n;
    }
    // recursive case: calculate the value of n using the formula and store it in memo
    memo[n] = feboRecursion(n-1)+feboRecursion(n-2);
    return memo[n];
}
console.log(feboRecursion(100))
console.log(memo)
