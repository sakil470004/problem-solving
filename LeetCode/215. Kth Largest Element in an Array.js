// 215. Kth Largest Element in an Array
// premium lock icon
// Companies
// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

 

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4
 

// Constraints:

// 1 <= k <= nums.length <= 105
// -104 <= nums[i] <= 104
// 1st solution using sorting
// var findKthLargest = function(nums, k) {
//     nums.sort((a,b)=>(b-a));
//     const number=nums[k-1];
//     return number;
// };

function findKthLargest(nums, k) {
    const minHeap = [];

    // Insert number into heap and keep heap size <= k
    for (let num of nums) {
        minHeap.push(num);
        minHeap.sort((a, b) => a - b); // Maintain min-heap property

        if (minHeap.length > k) {
            minHeap.shift(); // Remove smallest
        }
    }

    return minHeap[0]; // The kth largest element
}


console.log(findKthLargest([3,2,1,5,6,4], 2)); // Output: 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Output: 4