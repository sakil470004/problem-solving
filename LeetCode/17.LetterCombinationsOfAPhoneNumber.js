// 17. Letter Combinations of a Phone Number
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// Example 1:
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// Example 2:
// Input: digits = ""
// Output: []
// Example 3:
// Input: digits = "2"
// Output: ["a","b","c"]

// mynul solution
var letterCombinations2 = function (digits) {
  if (!digits) return [];
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const results = [];
  // split the digit
  const digitsArray = digits.split("");
  const combinationLen = digitsArray.length;
  //convert digit array to letter array
  const convertLatterArray = (arr) => {
    const newArray = [];

    arr.forEach((digit) => {
      const splitArray = map[digit].split("");
      newArray.push(...splitArray);
    });
    return newArray;
  };
  const letterArray = convertLatterArray(digitsArray);
  console.log(letterArray);
  const letterArrayLen = letterArray.length;
  // recursive function to get all possible combinations
  const helper = (index, letterArray, subSet) => {
    // base case
    if (index > letterArrayLen) {
      return;
    }
    if (subSet.length === combinationLen) {
      results.push(subSet.join(""));
      return;
    }
    // recursive case
    // include the current letter
    subSet.push(letterArray[index]);
    helper(index + 1, letterArray, subSet);
    subSet.pop();
    // exclude the current letter
    helper(index + 1, letterArray, subSet);
  };
  helper(0, letterArray, []);
  return results;
};

const letterCombinations = (digits) => {
  if (digits.length === 0) return [];

  const phoneMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  function backtrack(index, currentCombination) {
    if (index === digits.length) {
      result.push(currentCombination);
      return;
    }
    //get current letters from phoneMap
    const letters = phoneMap[digits[index]];
    // console.log(letters)
    // loop though the letters
    for (let i = 0; i < letters.length; i++) {
      backtrack(index + 1, currentCombination + letters[i]);
    }
  }

  backtrack(0, "");
  return result;
};

console.log(letterCombinations("23"));
