// Coding Exercise: Edit Distance
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

// You have the following three operations permitted on a word:

// •Insert a character

// •Delete a character

// •Replace a character

// Example: 

// Input: word1 = "hodse", word2 = "dos"
// Output: 3    
// Explanation:     
// hodse -> dodse (replace 'h' with 'd')    
// dodse -> dose (remove 'd')
// dose -> dos (remove 'e')

var minDistance = function (word1, word2) {
    //Write Code here 
    if (!word1 || !word1) {
        return Math.max(word1.length, word2.length);    
    }
    if (word1 === word2) {
        return 0;
    }
    
};
