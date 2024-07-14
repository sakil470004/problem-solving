/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // Sort the array
    nums.sort((a, b) => a - b);
    
    const result = [];
    const len = nums.length;
    
    for (let i = 0; i < len - 2; i++) {
        // Avoid duplicates for the first element
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        let left = i + 1;
        let right = len - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Avoid duplicates for the second and third elements
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                
                // Move the pointers after processing
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
};

// Example usage:
console.log(threeSum([-1, 0, 1, 2, -1, -4]));//time complexity: O(n^2)//space complexity: O(n)
// Output: [ [-1, -1, 2], [-1, 0, 1] ]
