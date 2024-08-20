
// 56. Merge Intervals

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

// Example 1:

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

var merge = function(intervals) {
    if (intervals.length === 0) return [];
    
    // Step 1: Sort the intervals based on the starting point
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Step 2: Initialize the merged intervals array with the first interval
    let merged = [intervals[0]];
    
    // Step 3: Iterate through each interval and merge if necessary
    for (let i = 1; i < intervals.length; i++) {
        let prev = merged[merged.length - 1];
        let curr = intervals[i];
        
        if (curr[0] <= prev[1]) {
            // If the current interval overlaps with the previous, merge them
            prev[1] = Math.max(prev[1], curr[1]);
        } else {
            // Otherwise, add the current interval to the merged list
            merged.push(curr);
        }
    }
    
    return merged;
};
