// 90. Subsets II
// Medium
// Topics
// Companies
// Given an integer array nums that may contain duplicates, return all possible 
// subsets
//  (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.



// Example 1:

// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
// Example 2:

// Input: nums = [0]
// Output: [[],[0]]

var subsetsWithDup = function (nums) {
    let results = [];
    const n = nums.length;
    nums.sort((a, b) => a - b);
    const helper = (index, subset) => {
        // base condition
        if (index === n) {
            results.push([...subset]);
            return;
        }


        // recursive case
        // include
        subset.push(nums[index]);
        helper(index + 1, subset);
        subset.pop();//backtracking
        // fileter the duplicates
        while (index < nums.length-1 && nums[index] === nums[index + 1]) {

            index++;
        }
        // exclude
        helper(index + 1, subset);



    }
    helper(0, []);
    return results;
};
console.log(subsetsWithDup([1, 2, 2])); // [[],[1],[1,2],[1,2,2],[2],[2,2]]