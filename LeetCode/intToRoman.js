/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const roman = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };

  const values = Object.keys(roman).reverse();
  console.log(values);
  let result = "";
  let i = 0;
  while (num > 0) {
    const value = values[i];
    if (num >= value) {
      result += roman[value];
      console.log(result);
      num -= value;
    } else {
      i++;
    }
  }
  return result;
};

const result = intToRoman(3749);
console.log(result);
