// 49. Group Anagrams
//? Given an array of strings strs, group the anagrams together. You can return the answer in any order.

//? An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]
var groupAnagrams = function (strs) {
  if (strs.length === 0) return [[""]];
  const hash = {};
  for (const str of strs) {
    const sortedStr = str.split("").sort().join("");
    if (hash[sortedStr]) {
      hash[sortedStr].push(str);
    } else {
      hash[sortedStr] = [str];
    }
  }
  return Object.values(hash);
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["bat"],["nat","tan"],["ate","eat","tea"]])
