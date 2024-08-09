// 9. Palindrome Number
// Given an integer x, return true if x is a
// palindrome
// , and false otherwise.

// Example 1:

// Input: x = 121
// Output: true
// Explanation: 121 reads as 121 from left to right and from right to left.
// Example 2:

// Input: x = -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Example 3:

// Input: x = 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
// mine
var isPalindrome = function (x) {
  const xStr = x.toString();
  const xStrRev = xStr.split("").reverse().join("");
  return xStr === xStrRev;
};

// chatGPT
var isPalindrome2 = function(x) {
    // Special cases:
    // When x is negative or when x ends in 0 (but not 0 itself)
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let reversedHalf = 0;

    // Reverse the second half of the number
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + x % 10;
        x = Math.floor(x / 10);
    }

    // Check if the original first half matches the reversed second half
    // For odd digits, we need to remove the middle digit by reversedHalf // 10
    return x === reversedHalf || x === Math.floor(reversedHalf / 10);
};
console.log(isPalindrome2(121)); // true
