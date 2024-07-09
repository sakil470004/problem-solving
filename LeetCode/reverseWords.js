var reverseWords = function (s) {
  const sReverseArr = s.trim().split(" ").reverse();
  let newString = "";
  console.log(sReverseArr);
  for (let i = 0; i < sReverseArr.length; i++) {
    if (sReverseArr[i] === "") {
    } else {
      if (newString === "") {
        newString = sReverseArr[i].trim();
      } else {
        newString = newString + " " + sReverseArr[i].trim();
      }
    }
  }
  return newString;
};

const result = reverseWords("a good   example");
console.log(result);
