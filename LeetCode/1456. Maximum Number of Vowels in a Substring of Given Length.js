// 1456. Maximum Number of Vowels in a Substring of Given Length
// Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

 

// Example 1:

// Input: s = "abciiidef", k = 3
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.
// Example 2:

// Input: s = "aeiou", k = 2
// Output: 2
// Explanation: Any substring of length 2 contains 2 vowels.
// Example 3:

// Input: s = "leetcode", k = 3
// Output: 2
// Explanation: "lee", "eet" and "ode" contain 2 vowels.
 

var maxVowels = function(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    
    // Helper function to count vowels in a substring
    const countVowels = (start, len) => {
        if (len === 0) return 0;
        
        // Count current character if vowel
        let count = vowels.has(s[start]) ? 1 : 0;
        
        // Recursively count remaining characters
        return count + countVowels(start + 1, len - 1);
    }
    
    let maxCount = 0;
    
    // Check each possible window of size k
    for (let i = 0; i <= s.length - k; i++) {
        maxCount = Math.max(maxCount, countVowels(i, k));
        // Early exit if we found maximum possible vowels
        if (maxCount === k) return k;
    }
    
    return maxCount;
 };
 
 console.log(maxVowels("abciiidef", 3)); // 3
console.log(maxVowels("abciiidef",3)) //3