// 47. Permutations II
// Medium
// Topics
// Companies
// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

 

// Example 1:

// Input: nums = [1,1,2]
// Output:
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// Example 2:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// mynul code
var permuteUnique = function (nums) {
    //Write code here
    const results = [];
    const n = nums.length;
    nums.sort((a, b) => a - b);
    const helper = (index) => {
        if (index === n - 1) {
            results.push([...nums]);
            return;
        }
        const hash = {};

        for (let j = index; j < n; j++) {
            if (!hash[nums[j]]) {
                hash[nums[j]] = 1;
                [nums[j], nums[index]] = [nums[index], nums[j]];
                helper(index + 1);
                [nums[j], nums[index]] = [nums[index], nums[j]];

            }
        }
    }
    helper(0);
    return results;
};
const result = permuteUnique([0, 0, 1, 1]);
console.log(result);