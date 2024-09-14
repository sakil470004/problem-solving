// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

 

// Example 1:

// Input: s = "IceCreAm"

// Output: "AceCreIm"

// Explanation:

// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

// Example 2:

// Input: s = "leetcode"

// Output: "leotcede"

function reverseVowels(s) {
    // Convert the string to an array to easily swap characters
    let arr = s.split('');
    // Define the vowels (both lowercase and uppercase)
    let vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    // Two-pointer approach, start at both ends of the string
    let left = 0;
    let right = arr.length - 1;

    // Loop until the two pointers cross each other
    while (left < right) {
        // Move left pointer to the next vowel
        while (left < right && !vowels.has(arr[left])) {
            left++;
        }
        // Move right pointer to the previous vowel
        while (left < right && !vowels.has(arr[right])) {
            right--;
        }
        // Swap the vowels at the left and right pointers
        [arr[left], arr[right]] = [arr[right], arr[left]];
        // Move the pointers inward
        left++;
        right--;
    }

    // Convert the array back to a string and return the result
    return arr.join('');
}

