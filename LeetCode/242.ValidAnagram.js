// write the leetcode question for me

var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  const sArray = s.split("").sort();
  const tArray = t.split("").sort();
  for (let i = 0; i < sArray.length; i++) {
    if (sArray[i] !== tArray[i]) {
      return false;
    }
  }
  return true;
};
var isAnagram2 = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = hash[s[i]] + 1 || 1;
  }
  for (let i = 0; i < t.length; i++) {
    if (!hash[t[i]]) {
      return false;
    }
    hash[t[i]]--;
    if (hash[t[i]] < 0) {
      return false;
    }
  }
  //?   check hash empty ?
  return true;
};
const result = isAnagram("anagram", "nagaram");
const result2 = isAnagram2("cat", "rat");
console.log(result);
console.log(result2);
