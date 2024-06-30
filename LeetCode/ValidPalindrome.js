var isPalindrome = function (s) {
  // const letter = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const smallLetter = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const letter = s
    .toLowerCase()
    .split("")
    .map((char) => {
      if (smallLetter.includes(char)) {
        return char;
      }
    })
    .join("");
  const reverse = letter.split("").reverse().join("");
  return letter === reverse;
};

const result = isPalindrome("OP");
console.log(result); // Expected output: true
