//? Given two strings s and t, determine if they are isomorphic.

//? Two strings s and t are isomorphic if the characters in s can be replaced to get t.
//? All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.
// ! Example 1: Input: s = "egg", t = "add" Output: true
// ! Example 2: Input: s = "foo", t = "bar" Output: false
// ! Example 3: Input: s = "paper", t = "title" Output: true
// ! Constraints: 1 <= s.length <= 5 * 104 t.length == s.length s and t consist of any valid ascii character.

//? Approach
//? 1. Create a map of characters from s to t.
//? 2. Iterate through the characters of s and t.
//? 3. Check if the character from s is already mapped to a character in t.
const isIsomorphic = function (s, t) {
  if (s === t) {
    return true;
  }
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false;
    }
  }
  return true;
};

const result = isIsomorphic("foo", "baa");
console.log(result); //true
