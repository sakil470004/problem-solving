// 567. Permutation in String
// Medium
// Topics
// Companies
// Hint
// Given two strings s1 and s2, return true if s2 contains a 
// permutation
//  of s1, or false otherwise.

// In other words, return true if one of s1's permutations is the substring of s2.



// Example 1:

// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").
// Example 2:

// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false


// Constraints:
// 1 <= s1.length, s2.length <= 104
// s1 and s2 consist of lowercase English letters.
var checkInclusion = function (s1, s2) {
    // First, if s1 is longer than s2, there is no way a permutation of s1 can be a substring of s2.
    if (s1.length > s2.length) return false;

    // Create an array to count characters in s1 (since there are only 26 lowercase letters).
    let s1Map = new Array(26).fill(0);
    let s2Map = new Array(26).fill(0);

    // Helper function to map characters 'a' to 'z' into indices 0 to 25.
    function charCode(c) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    // Fill s1Map with the character counts for s1.
    for (let i = 0; i < s1.length; i++) {
        s1Map[charCode(s1[i])]++; // Count characters in s1.
        s2Map[charCode(s2[i])]++; // Count the first `s1.length` characters in s2.
    }

    // Sliding window: Compare character counts for substrings of length s1.length.
    for (let i = 0; i <= s2.length - s1.length; i++) {
        // If the two maps are equal, it means the substring in s2 matches a permutation of s1.
        if (arraysEqual(s1Map, s2Map)) return true;

        // Slide the window forward by removing the character at the start of the current window
        // and adding the next character in s2.
        if (i + s1.length < s2.length) {
            s2Map[charCode(s2[i])]--; // Remove the old character.
            s2Map[charCode(s2[i + s1.length])]++; // Add the new character.
        }
    }

    // Check the last window.
    return arraysEqual(s1Map, s2Map);
};

// Helper function to compare two arrays element-wise.
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// mynul code why it is not working don't know date : 05-10-2024

var checkInclusion2 = function (s1, s2) {
    s1 = s1.split('').sort();
    s2 = s2.split('').sort();
    let s1Length = s1.length;
    let s2Length = s2.length;
    let s1Counter = 0;
    let totalMatches = 0;
    for (let i = 0; i <= s2Length - s1Length; i++) {
        if (s1[s1Counter] === s2[i] && totalMatches < s1Length) {
            totalMatches++;
            s1Counter++;
        } else if (totalMatches < s1Length) {
            s1Counter = 0;
            totalMatches = 0;
        }
    }
    console.log(totalMatches, s1Length);
    if (totalMatches === s1Length) {
        return true;
    }
    return false;
};

console.log(checkInclusion("ab", "eidbaooo")) // true