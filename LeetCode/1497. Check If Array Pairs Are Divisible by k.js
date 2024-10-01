// 1497. Check If Array Pairs Are Divisible by k
// Given an array of integers arr of even length n and an integer k.

// We want to divide the array into exactly n / 2 pairs such that the sum of each pair is divisible by k.

// Return true If you can find a way to do that or false otherwise.



// Example 1:

// Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
// Output: true
// Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
// Example 2:

// Input: arr = [1,2,3,4,5,6], k = 7
// Output: true
// Explanation: Pairs are (1,6),(2,5) and(3,4).
// Example 3:

// Input: arr = [1,2,3,4,5,6], k = 10
// Output: false
// Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.

function canArrange(arr, k) {
    // Create an array to store remainders (like buckets for each remainder)
    let remainderCounts = new Array(k).fill(0);

    // Step 1: Count the remainders
    for (let num of arr) {
        let remainder = num % k; // Find remainder when num is divided by k
        if (remainder < 0) remainder += k; // Make sure remainder is positive
        remainderCounts[remainder]++; // Increase the count of this remainder
    }

    // Step 2: Check if we can pair them up
    for (let i = 1; i < k; i++) {
        if (remainderCounts[i] !== remainderCounts[k - i]) {
            // If count of remainder i isn't equal to count of remainder k - i, we can't pair them
            return false;
        }
    }

    // Step 3: Special case for remainder 0
    if (remainderCounts[0] % 2 !== 0) {
        // If the count of numbers divisible by k isn't even, we can't pair them
        return false;
    }

    // If all checks pass, we can arrange them in pairs
    return true;
}

console.log(canArrange([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5)) // true