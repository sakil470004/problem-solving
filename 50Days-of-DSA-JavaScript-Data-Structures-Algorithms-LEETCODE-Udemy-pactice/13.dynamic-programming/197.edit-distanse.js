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

//recursive solution
var minDistance = function (word1, word2) {
    //Write Code here 
    let n = word1.length;
    let m = word2.length;
    var number_of_operations = (index1, index2) => {
        //   base case 
        if (index1 > n - 1 && index2 > m - 1) {
            return 0;
        }
        if (index1 > n - 1) {
            return m - index2
        }
        if (index2 > m - 1) {
            return n - index1;
        }
        // recursive case
        // ?equal
        if (word1[index1] === word2[index2]) {
            return number_of_operations(index1 + 1, index2 + 1);
        }
        //not equal 
        var insert = 1 + number_of_operations(index1, index2 + 1)
        var deleteOp = 1 + number_of_operations(index1 + 1, index2)
        var replace = 1 + number_of_operations(index1 + 1, index2 + 1)
        return Math.min(insert, deleteOp, replace)
    }
    return number_of_operations(0, 0);
};

//memoization
var minDistance = function (word1, word2) {
    //Write Code here 
    let n = word1.length;
    let m = word2.length;
    let dp = Array.from({ length: n }, () => Array(m).fill(-1));
    var number_of_operations = (index1, index2) => {
        //   base case 
        if (index1 > n - 1 && index2 > m - 1) {
            return 0;
        }
        if (index1 > n - 1) {
            return m - index2
        }
        if (index2 > m - 1) {
            return n - index1;
        }
        // recursive case
        if (dp[index1][index2] !== -1) {
            return dp[index1][index2];
        }
        // ?equal
        if (word1[index1] === word2[index2]) {
            dp[index1][index2] = number_of_operations(index1 + 1, index2 + 1);
        } else {
            //not equal 
            var insert = 1 + number_of_operations(index1, index2 + 1)
            var deleteOp = 1 + number_of_operations(index1 + 1, index2)
            var replace = 1 + number_of_operations(index1 + 1, index2 + 1)
        }
        dp[index1][index2] = Math.min(insert, deleteOp, replace)
        return dp[index1][index2];
    }
    return number_of_operations(0, 0);
};
//tabulation
var minDistance = function (word1, word2) {
    
}