function palindromeIndex(s) {
  let result = -1;
  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - i - 1]) {
      if (s[i + 1] === s[s.length - i - 1]) {
        result = i;
      } else {
        result = s.length - i - 1;
      }
      break;
    }
  }
  return result;
}
function getTotalX(a, b) {
    function gcd(x, y) {
        return y === 0 ? x : gcd(y, x % y);
    }
    
    function gcdArray(arr) {
        return arr.reduce((acc, val) => gcd(acc, val));
    }
    
    function lcm(x, y) {
        return (x * y) / gcd(x, y);
    }
    
    function lcmArray(arr) {
        return arr.reduce((acc, val) => lcm(acc, val));
    }
    const lcmA=lcmArray(a);
    const gcdB=gcdArray(b);
    let count=0;
    for(let i=lcmA, j=2; i<=gcdB; i=lcmA*j, j++){
        if(gcdB%i===0){
            count++;
        }
    }
    return count;
  
}
const result = getTotalX([2, 4], [16, 32, 64,96]);
console.log(result)