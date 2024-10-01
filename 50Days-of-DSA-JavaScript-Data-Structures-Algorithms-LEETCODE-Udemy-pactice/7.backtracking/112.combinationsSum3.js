// CODING INTERVIEW QUESTION ( Medium) : Combinations Sum 3
// Question 2: Combinations Sum 3: Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

// •Only numbers 1 through 9 are used.

// •Each number is used at most once.

// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

// Input: k = 3, n = 6
// Output: [[1,2,3]] 
// Explanation:
// 1 + 2 + 3 = 6
// There are no other valid combinations.

var combinationSum3 = function(k, n) {
    //Write Code here
    let results = [];
    const helper = (index, currentSum, subset) => {
        // base condition
        // if currentSum
        if (currentSum === n && subset.length === k) {
            results.push([...subset]);
            return;
        }
        if (currentSum > n || index >= 9) {
            // if current is bigger there is no need to go in this branch
            return;
        }

        for (let j = index; j < 9; j++) {
            subset.push(j + 1);
            helper(j + 1, currentSum + j + 1, subset)
            // include new number
            subset.pop();
        }
    }
    helper(0, 0, []);
    return results;
};
console.log(combinationSum3(3, 6)) // [[1,2,3]]
console.log(combinationSum3(5, 10)) // [[1,2,3]]
console.log(combinationSum3(3, 9)) // [[1,2,3]]