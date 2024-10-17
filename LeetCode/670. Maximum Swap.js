// 670. Maximum Swap
// You are given an integer num. You can swap two digits at most once to get the maximum valued number.
// Return the maximum valued number you can get.
// Example 1:
// Input: num = 2736
// Output: 7236
// Explanation: Swap the number 2 and the number 7.
// Example 2:
// Input: num = 9973
// Output: 9973
// Explanation: No swap.


var maximumSwap = function(num) {
    // Convert the number to a string and split into an array of characters (digits)
    let digits = num.toString().split('');

    // Create an array to keep track of the last position of each digit (0-9)
    let last = new Array(10).fill(-1);

    // Populate the last array with the positions of each digit
    for (let i = 0; i < digits.length; i++) {
        last[digits[i]] = i;
    }

    // Iterate over the digits to find the first smaller digit that can be swapped
    for (let i = 0; i < digits.length; i++) {
        // Check from 9 down to the current digit + 1
        for (let d = 9; d > digits[i]; d--) {
            // If there's a digit greater than the current one and appears after it
            if (last[d] > i) {
                // Swap the digits
                [digits[i], digits[last[d]]] = [digits[last[d]], digits[i]];

                // Return the swapped number as an integer
                return parseInt(digits.join(''));
            }
        }
    }

    // If no swap was made, return the original number
    return num;
};