// get question from https://leetcode.com/problems/word-pattern/
// 290. Word Pattern
// Easy
// Topics
// Companies
// Given a pattern and a string s, find if s follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

// Example 1:

// Input: pattern = "abba", s = "dog cat cat dog"
// Output: true
// Example 2:

// Input: pattern = "abba", s = "dog cat cat fish"
// Output: false
// Example 3:

// Input: pattern = "aaaa", s = "dog cat cat dog"
// Output: false

var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    
    const charToWord = new Map();
    const wordToChar = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        
        if (!charToWord.has(char) && !wordToChar.has(word)) {
            charToWord.set(char, word);
            wordToChar.set(word, char);
        } else if (charToWord.get(char) !== word || wordToChar.get(word) !== char) {
            return false;
        }
    }
    
    return true;
};

// Test cases
console.log(wordPattern("abba", "dog cat cat dog")); // true
console.log(wordPattern("abba", "dog cat cat fish")); // false
console.log(wordPattern("aaaa", "dog cat cat dog")); // false
console.log(wordPattern("abba", "dog dog dog dog")); // false

