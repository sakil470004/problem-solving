/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    // Create a frequency map for the magazine
    let magazineMap = {};
    
    for (let char of magazine) {
        magazineMap[char] = (magazineMap[char] || 0) + 1;
    }
    
    // Check if the ransom note can be constructed
    for (let char of ransomNote) {
        if (!magazineMap[char]) {
            return false;
        }
        magazineMap[char]--;
    }
    
    return true;
};

// Example usage:
console.log(canConstruct("a", "b")); // Output: false
console.log(canConstruct("aa", "ab")); // Output: false
console.log(canConstruct("aa", "aab")); // Output: true
