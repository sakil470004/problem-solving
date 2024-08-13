//?42. Trapping Rain Water
//? Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

var trap = function(height) {
    if (height.length === 0) return 0; // If the array is empty, no water can be trapped

    let left = 0; // Start with the left pointer at index 0
    let right = height.length - 1; // Start with the right pointer at the last index
    let left_max = 0; // Initialize left_max to 0, to track the max height seen so far from the left
    let right_max = 0; // Initialize right_max to 0, to track the max height seen so far from the right
    let water = 0; // Initialize the total water trapped to 0

    while (left <= right) { // Continue until the pointers meet or cross
        if (height[left] <= height[right]) { // Compare the heights at the left and right pointers
            if (height[left] >= left_max) {
                left_max = height[left]; // Update left_max if the current height is greater or equal
            } else {
                water += left_max - height[left]; // Add trapped water (difference between left_max and current height)
            }
            left++; // Move the left pointer to the right
        } else {
            if (height[right] >= right_max) {
                right_max = height[right]; // Update right_max if the current height is greater or equal
            } else {
                water += right_max - height[right]; // Add trapped water (difference between right_max and current height)
            }
            right--; // Move the right pointer to the left
        }
    }

    return water; // Return the total amount of trapped water
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); //6