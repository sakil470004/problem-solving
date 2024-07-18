const kthSymbol = (n, k) => {
  if (k === 1 || n === 1) {
    return 0;
  }
  
};
const result = kthSymbol(3, 4);
console.log(result);
//  clarifying question;
// is it possible that n is given as 0?// no , n>=1
// can  be out of bound ? for eg. if n=3 , there will be 4 number can k be given as 5?1=<j =<2^n-1
