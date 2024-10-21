// Given a string s, return the maximum number of unique substrings that the given string can be split into.

// You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.

// A substring is a contiguous sequence of characters within a string.

 

// Example 1:

// Input: s = "ababccc"
// Output: 5
// Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.
// Example 2:

// Input: s = "aba"
// Output: 2
// Explanation: One way to split maximally is ['a', 'ba'].
// Example 3:

// Input: s = "aa"
// Output: 1
// Explanation: It is impossible to split the string any further.

// 1593. Split a String Into the Max Number of Unique Substrings
function maxUniqueSplit(s) {
    let maxCount = 0;
    let uniqueSet = new Set();

    function dfs(start) {
        if (start === s.length) {
            // If we've reached the end, update the max count
            maxCount = Math.max(maxCount, uniqueSet.size);
            return;
        }

        for (let end = start + 1; end <= s.length; end++) {
            let substring = s.slice(start, end);
            if (!uniqueSet.has(substring)) {
                uniqueSet.add(substring);
                dfs(end);  // Recur for the rest of the string
                uniqueSet.delete(substring);  // Backtrack to try another split
            }
        }
    }

    dfs(0);  // Start DFS from index 0
    return maxCount;
}
