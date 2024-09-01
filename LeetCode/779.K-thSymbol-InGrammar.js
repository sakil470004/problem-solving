// 779. K-th Symbol in Grammar
//? 1. We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.
//? 2. Given two integers n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.
//? 3. Example 1: Input: n = 1, k = 1 Output: 0 Explanation: row 1: 0
//? 4. Example 2: Input: n = 2, k = 1 Output: 0 Explanation: row 1: 0 row 2: 01
//? 5. Example 3: Input: n = 2, k = 2 Output: 1 Explanation: row 1: 0 row 2: 01
var kthGrammar = function (n, k) {
  // *base condition
  if (n === 1 || k === 1) {
    return 0;
  }
  // *recursive case
  let length = Math.pow(2, n - 1);
  let mid = length / 2;
  if (k <= mid) {
    return kthGrammar(n - 1, k);
  } else {
    // ? as 2nd half is opposite of 1st half so if k is greater than mid then we will return 1 - kthGrammar(n - 1, k - mid);
    return 1 - kthGrammar(n - 1, k - mid);
  }
};

//note: it would not working becouse it k cannot 0 . so it return 0. console.log(kthGrammar(4, 0));
console.log(kthGrammar(4, 1));
console.log(kthGrammar(4, 2));
console.log(kthGrammar(4, 3));
console.log(kthGrammar(4, 4));
console.log(kthGrammar(4, 5));
console.log(kthGrammar(4, 6));
console.log(kthGrammar(4, 7));
console.log(kthGrammar(4, 8));
