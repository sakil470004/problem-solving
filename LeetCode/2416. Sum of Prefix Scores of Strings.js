// 2416. Sum of Prefix Scores of Strings
// Hard
// Topics
// Companies
// Hint
// You are given an array words of size n consisting of non-empty strings.

// We define the score of a string term as the number of strings words[i] such that term is a prefix of words[i].

// For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
// Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].

// Note that a string is considered as a prefix of itself.



// Example 1:

// Input: words = ["abc","ab","bc","b"]
// Output: [5,4,3,2]
// Explanation: The answer for each string is the following:
// - "abc" has 3 prefixes: "a", "ab", and "abc".
// - There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
// The total is answer[0] = 2 + 2 + 1 = 5.
// - "ab" has 2 prefixes: "a" and "ab".
// - There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
// The total is answer[1] = 2 + 2 = 4.
// - "bc" has 2 prefixes: "b" and "bc".
// - There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
// The total is answer[2] = 2 + 1 = 3.
// - "b" has 1 prefix: "b".
// - There are 2 strings with the prefix "b".
// The total is answer[3] = 2.
// Example 2:

// Input: words = ["abcd"]
// Output: [4]
// Explanation:
// "abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
// Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.

// mynul code but got time limit exceeded
var sumPrefixScores2 = function (words) {
    let prefixesArray = new Array(words.length).fill(0);
    const wordsArray = words.map(word => word.split(''));
    let stack = {}
    // console.log(wordsArray);
    for (let i = 0; i < wordsArray.length; i++) {
        let str="";
        for (let j = 0; j < wordsArray[i].length; j++) {
            str+=wordsArray[i][j];
            if (!stack[str]) {
                stack[str] = 1;
            } else {
                stack[str]++;
            }
        }
    }
    // now find the current string in the stack and add the value to the prefixesArray
    for(let i=0;i<wordsArray.length;i++){
        let str="";
        for(let j=0;j<wordsArray[i].length;j++){
            str+=wordsArray[i][j];
            prefixesArray[i]+=stack[str];
        }
    }
    return prefixesArray;
};
var sumPrefixScores = function(words) {
    // Initialize the root of the Trie as an empty object
    const root = {};

    // Step 1: Build the Trie and store prefix counts
    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node[char]) {
                node[char] = { count: 0 }; // Create a new node with a 'count' property
            }
            node = node[char];
            node.count++;  // Increment the count for this prefix
        }
    }

    // Step 2: Calculate the sum of prefix scores for each word
    const result = [];
    for (const word of words) {
        let node = root;
        let score = 0;
        for (const char of word) {
            node = node[char];
            score += node.count; // Accumulate the prefix count
        }
        result.push(score);
    }

    return result;
};

console.log(sumPrefixScores(["abc", "ab", "bc", "b"])); // [5,4,3,2]