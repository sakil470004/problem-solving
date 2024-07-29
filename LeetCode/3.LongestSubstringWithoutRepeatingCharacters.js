/* //? Given a string s, find the length of the longest 
substring
 without repeating characters.


Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
*/
//? Approach: Sliding Window
//? Intuition
//? The naive approach is very straightforward. But it is too slow. So how can we optimize it?
//? In the naive approaches, we repeatedly check a substring to see if it has duplicate character. But it is unnecessary. If a substring s_{ij}
//? from index i to j−1 is already checked to have no duplicate characters. We only need to check if s[j] is already in the substring s_{ij}.

var lengthOfLongestSubstring = function (s) {
  let len = s.length;
  let sArray = s.split("");
  let newArray = [];
  let longest = 0;
  for (let i = 0; i < len; i++) {
    console.log(newArray);
    if (newArray.includes(sArray[i])) {
      newArray = newArray.slice(newArray.indexOf(sArray[i]) + 1);
    }
    newArray.push(sArray[i]);
    longest = Math.max(longest, newArray.length);
    console.log(newArray);
  }
  return longest;
};

console.log(lengthOfLongestSubstring("abcabcbb")); //3
console.log(lengthOfLongestSubstring("bbbbb")); //1
console.log(lengthOfLongestSubstring("pwwkew")); //3
