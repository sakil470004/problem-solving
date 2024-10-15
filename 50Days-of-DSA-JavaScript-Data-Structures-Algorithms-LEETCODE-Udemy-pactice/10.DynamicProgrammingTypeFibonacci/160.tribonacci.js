// CODING INTERVIEW QUESTION(Easy): Tribonacci
// Question 2: Tribonacci: The Tribonacci sequence Tn is defined as follows:

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.
// tabulation approach
var tribonacci = function (n) {
    let t0 = 0;
    let t1 = 1;
    let t2 = 1;
    if (n === 0) return t0;
    if (n === 1) return t1;
    if (n === 2) return t2;
    for (let i = 3; i <= n; i++) {
        let temp = t0 + t1 + t2;
        t0 = t1;
        t1 = t2;
        t2 = temp;
    }
    return t2;

};
// recursive approach
var tribonacci2 = function (n) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
}
