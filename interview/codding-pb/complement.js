//? Q: Given an array of numbers, return indices of the two numbers that add up to a target.


function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]