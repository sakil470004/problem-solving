// 216. Combination Sum III
// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

// Only numbers 1 through 9 are used.
// Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.



// Example 1:

// Input: k = 3, n = 7
// Output: [[1,2,4]]
// Explanation:
// 1 + 2 + 4 = 7
// There are no other valid combinations.
// Example 2:

// Input: k = 3, n = 9
// Output: [[1,2,6],[1,3,5],[2,3,4]]
// Explanation:
// 1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// There are no other valid combinations.
// Example 3:

// Input: k = 4, n = 1
// Output: []
// Explanation: There are no valid combinations.
// Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

var combinationSum3 = function (k, n) {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];
    let helper = (index, subArray, curr) => {
        // base case
        if (subArray.length === k && curr === n) {
            result.push([...subArray]);
            return;
        }
        if (subArray.length > k || curr > n) {
            return;
        }
        // recursive case
        for (let i = index; i <= 9; i++) {
            subArray.push(array[i]);
            helper(i + 1, subArray, curr +array[i]);// i+1 because we are starting from 1
            subArray.pop();
        }
    }
    helper(0, [], 0);
    return result;
};
// mynul best solution
var combinationSum3 = function (k, n) {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];
    let helper = (index, subArray, curr) => {
        // base case
        // console.log(subArray, curr);
        if (subArray.length === k && curr === n) {
            result.push([...subArray]);
            return;
        }
        if (subArray.length > k || curr > n||index>=9) {
            return;
        }
        // recursive case
        // exclude
        helper(index + 1, subArray, curr);
        // include
        subArray.push(array[index]);
        helper(index + 1, subArray, curr + array[index]);
        subArray.pop();

    }
    helper(0, [], 0);
    return result;
};
console.log(combinationSum3(3, 7)); //[[1,2,4]]