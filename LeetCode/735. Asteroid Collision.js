// 735. Asteroid Collision
// We are given an array asteroids of integers representing asteroids in a row.

// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

// Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

 

// Example 1:

// Input: asteroids = [5,10,-5]
// Output: [5,10]
// Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
// Example 2:

// Input: asteroids = [8,-8]
// Output: []
// Explanation: The 8 and -8 collide exploding each other.
// Example 3:

// Input: asteroids = [10,2,-5]
// Output: [10]
// Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

var asteroidCollision = function(asteroids) {
    const stack = [];
    
    for(let asteroid of asteroids) {
        // Keep checking collisions while we have asteroids
        let shouldAdd = true;
        
        while(stack.length && asteroid < 0 && stack[stack.length - 1] > 0) {
            // Right-moving asteroid at stack top collides with current left-moving asteroid
            if(stack[stack.length - 1] < -asteroid) {
                // Top asteroid is smaller, it explodes
                stack.pop();
                continue;
            } 
            else if(stack[stack.length - 1] === -asteroid) {
                // Equal size, both explode
                stack.pop();
                shouldAdd = false;
            } else {
                // Current asteroid is smaller, it explodes
                shouldAdd = false;
            }
            break;
        }
        
        if(shouldAdd) {
            stack.push(asteroid);
        }
    }
    
    return stack;
};

console.log(asteroidCollision([5,10,-5]));//[5,10]