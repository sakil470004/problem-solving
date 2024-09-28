//Exercise: Combinations Sum 1
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// (the integers in the candidates array are all non negative )

// Example 1:

// Input: candidates = [2,3,8,9], target = 9
// Output: [[2,2,2,3],[3,3,3],[9]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 2+ 3 = 9. Note that 2 can be used multiple times.
// 3 is a candidate and 3+3+3 = 9.
// 9 is a candidate, and 9 = 9.
// These are the only two combinations.

var combinationSum = function (candidates, target) {
    let results = [];
    const len = candidates.length;
    const helper = (index, currentSum, subset) => {
        // base condition
        // if currentSum
        if (currentSum === target) {
            results.push([...subset]);
            return;
        } else if (currentSum > target) {
            // if current is bigger there is no need to go in this branch
            return;
        }

        for (let j = index; j < len; j++) {
            // current number again
            subset.push(candidates[j]);
            helper(j, currentSum + candidates[j], subset)
            // include new number
            subset.pop();
        }

    }
    helper(0, 0, []);
    return results;
};

console.log(combinationSum([2, 3, 8, 9], 9))// [[2,2,2,3],[3,3,3],[9]]