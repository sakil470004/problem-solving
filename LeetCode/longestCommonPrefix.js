/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";
    
    // Initialize the prefix with the first string
    let prefix = strs[0];
    
    // Loop through the rest of the strings
    for (let i = 1; i < strs.length; i++) {
        // Reduce the prefix until it matches the start of the current string
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
};

// Example usage:
const strs = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strs)); // Output: "fl"
