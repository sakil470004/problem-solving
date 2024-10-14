// 2530. Maximal Score After Applying K Operations
// Medium
// Topics
// Companies
// Hint
// You are given a 0-indexed integer array nums and an integer k. You have a starting score of 0.

// In one operation:

// choose an index i such that 0 <= i < nums.length,
// increase your score by nums[i], and
// replace nums[i] with ceil(nums[i] / 3).
// Return the maximum possible score you can attain after applying exactly k operations.

// The ceiling function ceil(val) is the least integer greater than or equal to val.
// Example 1:
// Input: nums = [10,10,10,10,10], k = 5
// Output: 50
// Explanation: Apply the operation to each array element exactly once. The final score is 10 + 10 + 10 + 10 + 10 = 50.
// Example 2:
// Input: nums = [1,10,3,3,3], k = 3
// Output: 17
// Explanation: You can do the following operations:
// Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your score increases by 10.
// Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your score increases by 4.
// Operation 3: Select i = 2, so nums becomes [1,1,1,3,3]. Your score increases by 3.
// The final score is 10 + 4 + 3 = 17.

var maxKelements = function (nums, k) {
    // Use a max-heap (implemented using a min-heap with negative numbers in JavaScript)
    const maxHeap = new MaxPriorityQueue({ priority: x => x }); 

    // Insert all elements into the max-heap
    for (let num of nums) {
        maxHeap.enqueue(num);
    }

    let score = 0;

    // Repeat the process k times
    for (let i = 0; i < k; i++) {
        // Extract the maximum element
        let maxElement = maxHeap.dequeue().element;
        
        // Add it to the score
        score += maxElement;
        
        // Push back the modified value (maxElement/3 rounded up)
        maxHeap.enqueue(Math.ceil(maxElement / 3));
    }

    return score;
};

console.log(maxKelements([1, 10, 3, 3, 3], 3)) //50