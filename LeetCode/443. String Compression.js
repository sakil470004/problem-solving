// 443. String Compression
// Given an array of characters chars, compress it using the following algorithm:

// Begin with an empty string s. For each group of consecutive repeating characters in chars:

// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

// After you are done modifying the input array, return the new length of the array.

// You must write an algorithm that uses only constant extra space.



// Example 1:

// Input: chars = ["a","a","b","b","c","c","c"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
// Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
// Example 2:

// Input: chars = ["a"]
// Output: Return 1, and the first character of the input array should be: ["a"]
// Explanation: The only group is "a", which remains uncompressed since it's a single character.
// Example 3:

// Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
// Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
// Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
// mynul code but did work on local. but question said i need to modify the input array
var compress2 = function (chars) {
    let stack = {};
    for (let i = 0; i < chars.length; i++) {
        if (!stack[chars[i]]) {
            stack[chars[i]] = 1;
        } else {
            stack[chars[i]]++;
        }
    }
    let compressedArray = [];
    for (let key in stack) {
        if (stack[key] === 1) {
            compressedArray.push(key);
        } else {
            compressedArray.push(key);
            compressedArray.push(stack[key].toString());
        }
    }
   
    return compressedArray;

};
// changed code to modify the input arrays
var compress = function(chars) {
    let index = 0; // To track where we are modifying chars
    let i = 0; // To traverse through the array
    
    while (i < chars.length) {
        let char = chars[i]; // Current character
        let count = 0; // Initialize the count for this character
        
        // Count how many times this character repeats
        while (i < chars.length && chars[i] === char) {
            count++;
            i++;
        }
        
        // Write the character to the current index
        chars[index] = char;
        index++;
        
        // If the character appears more than once, write its count
        if (count > 1) {
            const countStr = count.toString();
            for (let j = 0; j < countStr.length; j++) {
                chars[index] = countStr[j];
                index++;
            }
        }
    }
    
    return index; // Return the length of the compressed array
};

console.log(compress(["a", "a", "b", "b", "c", "c", "c"])); // Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]