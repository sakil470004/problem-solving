// 1545. Find Kth Bit in Nth Binary String

// Given two positive integers n and k, the binary string Sn is formed as follows:

// S1 = "0"
// Si = Si - 1 + "1" + reverse(invert(Si - 1)) for i > 1
// Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).

// For example, the first four strings in the above sequence are:

// S1 = "0"
// S2 = "011"
// S3 = "0111001"
// S4 = "011100110110001"
// Return the kth bit in Sn. It is guaranteed that k is valid for the given n.

 

// Example 1:

// Input: n = 3, k = 1
// Output: "0"
// Explanation: S3 is "0111001".
// The 1st bit is "0".
// Example 2:

// Input: n = 4, k = 11
// Output: "1"
// Explanation: S4 is "011100110110001".
// The 11th bit is "1".
 

// Constraints:

// 1 <= n <= 20
// 1 <= k <= 2n - 1
var findKthBit = function(n, k) {
    // Helper function to reverse a bit
    const reverseBit = (bit) => bit === '0' ? '1' : '0';

    // Recursive function to find the k-th bit
    const helper = (n, k) => {
        if (n === 1) return '0'; // Base case: S1 is just "0"
        
        let length = (1 << n) - 1; // Length of S(n) is 2^n - 1
        let mid = Math.floor(length / 2) + 1; // Middle position
        
        if (k === mid) {
            return '1'; // Middle bit is always "1"
        } else if (k < mid) {
            return helper(n - 1, k); // k is in the left half
        } else {
            // k is in the right half
            // Map it to the corresponding index in the left half and invert the bit
            let mirrorK = length - k + 1;
            return reverseBit(helper(n - 1, mirrorK));
        }
    };

    return helper(n, k);}