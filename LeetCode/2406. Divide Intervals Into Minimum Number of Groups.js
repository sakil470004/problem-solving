// 2406. Divide Intervals Into Minimum Number of Groups
// Medium
// Topics
// Companies
// Hint
// You are given a 2D integer array intervals where intervals[i] = [lefti, righti] represents the inclusive interval [lefti, righti].

// You have to divide the intervals into one or more groups such that each interval is in exactly one group, and no two intervals that are in the same group intersect each other.

// Return the minimum number of groups you need to make.

// Two intervals intersect if there is at least one common number between them. For example, the intervals [1, 5] and [5, 8] intersect.

 

// Example 1:

// Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
// Output: 3
// Explanation: We can divide the intervals into the following groups:
// - Group 1: [1, 5], [6, 8].
// - Group 2: [2, 3], [5, 10].
// - Group 3: [1, 10].
// It can be proven that it is not possible to divide the intervals into fewer than 3 groups.
// Example 2:

// Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
// Output: 1
// Explanation: None of the intervals overlap, so we can put all of them in one group.
// I tried but got problem in understanding the problem. I will try again later.
var minGroups = function(intervals) {
    const hash = {};
    
    // Step 1: Track how many intervals start or end at each point
    for (let i = 0; i < intervals.length; i++) {
        let start = intervals[i][0];
        let end = intervals[i][1];
        
        // Increment the hash at the starting point of the interval
        hash[start] = (hash[start] || 0) + 1;
        
        // Decrement the hash at the end+1 point (this means interval ends before this point)
        hash[end + 1] = (hash[end + 1] || 0) - 1;
    }

    // Step 2: Traverse the hash to calculate the maximum number of overlapping intervals
    let current = 0;
    let result = 0;
    
    // Get all time points in ascending order
    const keys = Object.keys(hash).map(Number).sort((a, b) => a - b);
    
    for (let key of keys) {
        current += hash[key];  // Track how many intervals are currently overlapping
        result = Math.max(result, current);  // Update the maximum overlap
    }
    
    return result;  // The result is the minimum number of groups needed
};


console.log(minGroups([[5,10],[6,8],[1,5],[2,3],[1,10]]))