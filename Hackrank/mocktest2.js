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

function anagram(s) {
    if(s.length%2!==0){
        return -1;
    }
    const arr1=s.slice(0, s.length/2).split('');
    const arr2=s.slice(s.length/2).split('');
    for(let i=0;i<arr1.length;i++){
        // we can delete the arr2 element every time we find the element in arr1
        if(arr2.includes(arr1[i])){
            arr2.splice(arr2.indexOf(arr1[i]), 1);
        }
    }
    return arr2.length;

}
const result = anagram('xyyx');
console.log(result)