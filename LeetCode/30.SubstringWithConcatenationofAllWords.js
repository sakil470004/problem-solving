/*//?You are given a string s and an array of strings words. All the strings of words are of the same length.

A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.

 

Example 1:

Input: s = "barfoothefoobarman", words = ["foo","bar"]

Output: [0,9]

Explanation:

The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

Example 2:

Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

Output: []

Explanation:

There is no concatenated substring.

Example 3:

Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

Output: [6,9,12]

Explanation:

The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].

 

Constraints:

1 <= s.length <= 104
1 <= words.length <= 5000
1 <= words[i].length <= 30
s and words[i] consist of lowercase English letters.*/

var findSubstring = function(s, words) {

    if (!s || words.length === 0) return [];
    
    const wordLength = words[0].length;
    const wordsCount = words.length;
    const wordMap = {};

    // ! create a hash table for words
    for (const word of words) {
        wordMap[word] = (wordMap[word] || 0) + 1;
    }
    
    const resultIndices = [];
    
    // ! loop through the word length   
    for (let i = 0; i < wordLength; i++) {
        let left = i, right = i, count = 0;
        let currentMap = {};
        
        while (right + wordLength <= s.length) {
            const word = s.slice(right, right + wordLength);
            right += wordLength;
            
            if (word in wordMap) {
                currentMap[word] = (currentMap[word] || 0) + 1;
                count++;
                
                while (currentMap[word] > wordMap[word]) {
                    const leftWord = s.slice(left, left + wordLength);
                    currentMap[leftWord]--;
                    left += wordLength;
                    count--;
                }
                
                if (count === wordsCount) {
                    resultIndices.push(left);
                }
            } else {
                currentMap = {};
                count = 0;
                left = right;
            }
        }
    }
    
    return resultIndices;
};


console.log(findSubstring("barfoothefoobarman", ["foo", "bar"])); //[0,9]
console.log(
  findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"])
); //[]
