// Coding Exercise: LCS ( Longest Common Subsequence)
// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

// •For example, "ace" is a subsequence of "abcde".

// A common subsequence of two strings is a subsequence that is common to both strings.

// Example: 

// Input: text1 = "pbcdq", text2 = "pcq" 
// Output: 3  
// Explanation: The longest common subsequence is "pcq" and its length is 3.

// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.

// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: There is no common subsequence.


var longestCommonSubsequence1 = function (text1, text2) {
    let output = 0;
    if (text1.length < text2.length) {
        for (let i = 0; i < text2.length; i++) {
            if (text2[i] === text1[output]) {
                output++;
            }
        }
    }
    else {
        for (let i = 0; i < text1.length; i++) {
            if (text1[i] === text2[output]) {
                output++;
            }
        }
    }
    return output;
};

// recursive
var longestCommonSubsequence2 = function (text1, text2) {
    //return lcs 
    const n = text1.length;
    const m = text2.length;
    const helper = (index1, index2) => {
        if (index1 >= n || index2 >= m) {
            return 0;
        }
        // recursive case
        if (text1[index1] === text2[index2]) {
            return 1 + helper(index1 + 1, index2 + 1);
        }
        const skip1 = helper(index1 + 1, index2);
        const skip2 = helper(index1, index2 + 1);
        return Math.max(skip1, skip2);
    }
    return helper(0, 0);
}
// recursive with memoization
var longestCommonSubsequence3 = function (text1, text2) {
    //return lcs 
    const n = text1.length;
    const m = text2.length;
    const dp = Array.from({ length: n }, () => Array(m).fill(-1));
    const helper = (index1, index2) => {
        if (index1 >= n || index2 >= m) {
            return 0;
        }
        if (dp[index1][index2] !== -1) {
            return dp[index1][index2];
        }
        // recursive case
        if (text1[index1] === text2[index2]) {
            dp[index1][index2] = 1 + helper(index1 + 1, index2 + 1);
        } else {
            const skip1 = helper(index1 + 1, index2);
            const skip2 = helper(index1, index2 + 1);
            dp[index1][index2] = Math.max(skip1, skip2);
        }
        return dp[index1][index2];
    }
    return helper(0, 0);
}
// tabulation
var longestCommonSubsequence4 = function (text1, text2) {
    let n = text1.length;
    let m = text2.length;
    let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[n][m];
}
// space optimized
var longestCommonSubsequence = function (text1, text2) {
    let n = text1.length;
    let m = text2.length;
    let prev = Array(m + 1).fill(0);
    let curr = Array(m + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        prev = [...curr];
    }
    return curr[m];
}

console.log(longestCommonSubsequence("pbcdq", "pcq")) // 3