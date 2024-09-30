// Coding Exercise: Combinations Sum 2
// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

// Example :

// Input: candidates = [3,5,2,1,3], target = 7
// Output: 
// [
// [1,3,3],
// [5,2]
// ]

var combinationSum2 = function (candidates, target) {
    let results = [];
    const len = candidates.length;
    candidates.sort((a, b) => a - b);
    const helper = (index, currentSum, subset) => {
        // base condition
        // if currentSum
        if (currentSum === target) {
            results.push([...subset]);
            return;
        }
        if (currentSum > target || index >= candidates.length) {
            // if current is bigger there is no need to go in this branch
            return;
        }

        let hash = {};
        for (let j = index; j < candidates.length; j++) {
            // current number again
            if (!hash[candidates[j]]) {

                hash[candidates[j]] = true
                subset.push(candidates[j]);
                helper(j + 1, currentSum + candidates[j], subset)
                // include new number
                subset.pop();
            }
        }

    }
    helper(0, 0, []);
    return results;
}