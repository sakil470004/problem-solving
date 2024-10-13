// 632. Smallest Range Covering Elements from K Lists
// Hard
// Topics
// Companies
// You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

// We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

// Example 1:

// Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
// Output: [20,24]
// Explanation: 
// List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
// List 2: [0, 9, 12, 20], 20 is in range [20,24].
// List 3: [5, 18, 22, 30], 22 is in range [20,24].
// Example 2:

// Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
// Output: [1,1]
var smallestRange = function(nums) {
    // k is the number of lists in nums
    const k = nums.length;
    
    // Map to keep track of how many elements from each list are in the current range
    const coverMap = new Map();
    
    // Flatten the nums array and keep track of which list each element came from
    const elements = nums.reduce((result, list, index) => {
        for (const num of list) {
            result.push({ num, index });
        }
        return result;
    }, []);
    
    // Initialize variables for the sliding window
    let left = 0;  // Left pointer of the window
    let coverCount = 0;  // Number of lists covered by the current window
    let minRange = Number.MAX_SAFE_INTEGER;  // Initialize the minimum range to a large number
    
    // Sort the flattened array by the numeric value
    elements.sort((a, b) => a.num - b.num);
    
    // Iterate through the sorted array
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        const count = coverMap.get(element.index) ?? 0;
        
        // If this is the first element from this list, increment coverCount
        if (!count) coverCount += 1;
        coverMap.set(element.index, count + 1);
        
        // While the window covers all k lists, try to minimize the range
        while (coverCount === k) {
            const leftElement = elements[left];
            const range = element.num - leftElement.num;
            const leftCount = coverMap.get(leftElement.index);
            
            // Update the minimum range if a smaller range is found
            if (range < minRange) {
                minRange = range;
                result = [leftElement.num, element.num];
            }
            
            // Move the left pointer of the window
            coverMap.set(leftElement.index, leftCount - 1);
            if (leftCount - 1 === 0) coverCount -= 1;
            left += 1;
        }
    }
    
    // Return the smallest range found
    return result;
};
console.log(smallestRange([[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]))