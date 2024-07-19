const kthSymbol = (n, k) => {
  /* 
* explain about problem. 1st haft and not of 1st half
note: k value start with 1
0
01   n=2
0110 n=3
01101001 !n=4
*/
  // *base case
  if (n === 1) {
    return 0;
  }
  // *recursive case
  let length = Math.pow(2, n - 1);
  let mid = length / 2;
  if (k <= mid) {
    return kthSymbol(n - 1, k);
  } else {
    // ! 1- if out put is 1 it will make output 0 if output is 0 it make output 1
    return 1 - kthSymbol(n - 1, k - mid);
  }
};
//note: it would not working becouse it k cannot 0 . so it return 0. console.log(kthSymbol(4, 0));
console.log(kthSymbol(4, 1));
console.log(kthSymbol(4, 2));
console.log(kthSymbol(4, 3));
console.log(kthSymbol(4, 4));
console.log(kthSymbol(4, 5));
console.log(kthSymbol(4, 6));
console.log(kthSymbol(4, 7));
console.log(kthSymbol(4, 8));
//  clarifying question;
// is it possible that n is given as 0?// no , n>=1
// can  be out of bound ? for eg. if n=3 , there will be 4 number can k be given as 5?1=<j =<2^n-1
