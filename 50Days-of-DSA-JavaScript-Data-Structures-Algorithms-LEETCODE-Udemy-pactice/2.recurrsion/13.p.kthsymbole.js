// https://leetcode.com/problems/k-th-`symbol-in-grammar/
//? 1. We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.
//? 2. Given two integers n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.
//? 3. Example 1: Input: n = 1, k = 1 Output: 0 Explanation: row 1: 0
//? 4. Example 2: Input: n = 2, k = 1 Output: 0 Explanation: row 1: 0 row 2: 01
//? 5. Example 3: Input: n = 2, k = 2 Output: 1 Explanation: row 1: 0 row 2: 01
const kthSymbol = (n, k) => {
  //* base case
  if (n === 1) {
    return 0;
  }
  //* recursive case
    let length = Math.pow(2, n - 1);
    let mid = length / 2;
    if(k<=mid){
        return kthSymbol(n-1,k);
    }else{
        return 1-kthSymbol(n-1,k-mid);
    }
};

console.log(kthSymbol(4, 1));
console.log(kthSymbol(4, 2));
console.log(kthSymbol(4, 3));
console.log(kthSymbol(4, 4));
console.log(kthSymbol(4, 5));
console.log(kthSymbol(4, 6));
console.log(kthSymbol(4, 7));
console.log(kthSymbol(4, 8));
