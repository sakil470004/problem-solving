// 2463. Minimum Total Distance Traveled
// Hard
// Topics
// Companies
// Hint
// There are some robots and factories on the X-axis. You are given an integer array robot where robot[i] is the position of the ith robot. You are also given a 2D integer array factory where factory[j] = [positionj, limitj] indicates that positionj is the position of the jth factory and that the jth factory can repair at most limitj robots.

// The positions of each robot are unique. The positions of each factory are also unique. Note that a robot can be in the same position as a factory initially.

// All the robots are initially broken; they keep moving in one direction. The direction could be the negative or the positive direction of the X-axis. When a robot reaches a factory that did not reach its limit, the factory repairs the robot, and it stops moving.

// At any moment, you can set the initial direction of moving for some robot. Your target is to minimize the total distance traveled by all the robots.

// Return the minimum total distance traveled by all the robots. The test cases are generated such that all the robots can be repaired.

// Note that

// All robots move at the same speed.
// If two robots move in the same direction, they will never collide.
// If two robots move in opposite directions and they meet at some point, they do not collide. They cross each other.
// If a robot passes by a factory that reached its limits, it crosses it as if it does not exist.
// If the robot moved from a position x to a position y, the distance it moved is |y - x|.
 

// Example 1:


// Input: robot = [0,4,6], factory = [[2,2],[6,2]]
// Output: 4
// Explanation: As shown in the figure:
// - The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
// - The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
// - The third robot at position 6 will be repaired at the second factory. It does not need to move.
// The limit of the first factory is 2, and it fixed 2 robots.
// The limit of the second factory is 2, and it fixed 1 robot.
// The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.
// Example 2:


// Input: robot = [1,-1], factory = [[-2,1],[2,1]]
// Output: 2
// Explanation: As shown in the figure:
// - The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
// - The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
// The limit of the first factory is 1, and it fixed 1 robot.
// The limit of the second factory is 1, and it fixed 1 robot.
// The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.

/**
 * @param {number[]} robots
 * @param {number[][]} factories
 * @return {number}
 */
var minimumTotalDistance = function(robots, factories) {
    robots.sort((a, b) => a - b);
    factories.sort((a, b) => a[0] - b[0]);
    
    const n = robots.length;
    const m = factories.length;
    const dp = Array(n + 1).fill().map(() => Array(m + 1).fill(Infinity));
    
    // Base case: zero robots means zero distance
    for (let j = 0; j <= m; j++) dp[0][j] = 0;
    
    for (let j = 1; j <= m; j++) {
        for (let i = 1; i <= n; i++) {
            let totalDist = 0;
            for (let k = 0; k <= Math.min(i, factories[j - 1][1]); k++) {
                if (k > 0) {
                    totalDist += Math.abs(robots[i - k] - factories[j - 1][0]);
                }
                dp[i][j] = Math.min(dp[i][j], dp[i - k][j - 1] + totalDist);
            }
        }
    }
    
    return dp[n][m];
};
