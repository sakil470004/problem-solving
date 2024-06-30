var isSubsequence = function (s, t) {
  const letters = s.split("");
  const mainString=t.split('');
  let count = 0;
  const len=letters.length;    
  const mainLen=mainString.length;
    for (let i = 0; i < mainLen; i++) {
        if (letters[count] === mainString[i]) {
        count++;
        }
    }
  return count === len;
};
const result = isSubsequence("abc", "ahbgdc");
console.log(result); // Expected output: true

