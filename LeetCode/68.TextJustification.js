// 68. Text Justification

// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left-justified, and no extra space is inserted between words.

// Note:

// A word is defined as a character sequence consisting of non-space characters only.
// Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
// The input array words contains at least one word.
 

// Example 1:

// Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
// Example 2:

// Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
// Output:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]
// Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
// Note that the second line is also left-justified because it contains only one word.
// Example 3:

// Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
// Output:
// [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  Art is",
//   "everything  else  we",
//   "do                  "
// ]
 
var fullJustify = function(words, maxWidth) {
    let result = []; // This will store all the justified lines
    let i = 0; // This will be used to iterate through the words array
    
    while (i < words.length) {
        let lineLength = words[i].length; // Start with the length of the first word in the line
        let last = i + 1; // Start checking from the next word
        
        // Try to fit as many words as possible into the current line
        while (last < words.length) {
            if (lineLength + words[last].length + 1 > maxWidth) break;
            lineLength += words[last].length + 1; // +1 for the space between words
            last++;
        }
        
        let line = ""; // This will store the current line
        let numberOfWords = last - i;
        let numberOfSpaces = maxWidth - lineLength;
        
        // If this is the last line or the line contains only one word, left-justify it
        if (last === words.length || numberOfWords === 1) {
            for (let j = i; j < last; j++) {
                line += words[j] + " ";
            }
            line = line.slice(0, -1); // Remove the trailing space
            while (line.length < maxWidth) {
                line += " "; // Add spaces at the end to fill the line
            }
        } else {
            // Calculate spaces to distribute evenly between words
            let spacesBetweenWords = Math.floor(numberOfSpaces / (numberOfWords - 1));
            let extraSpaces = numberOfSpaces % (numberOfWords - 1);
            
            for (let j = i; j < last - 1; j++) {
                line += words[j] + " ";
                for (let k = 0; k < spacesBetweenWords; k++) {
                    line += " "; // Add even spaces
                }
                if (extraSpaces > 0) {
                    line += " "; // Add extra spaces to the leftmost slots
                    extraSpaces--;
                }
            }
            line += words[last - 1]; // Add the last word of the line
        }
        
        result.push(line); // Add the line to the result
        i = last; // Move to the next group of words
    }
    
    return result;
};
