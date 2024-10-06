// 1813. Sentence Similarity III
// You are given two strings sentence1 and sentence2, each representing a sentence composed of words. A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each word consists of only uppercase and lowercase English characters.

// Two sentences s1 and s2 are considered similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. Note that the inserted sentence must be separated from existing words by spaces.

// For example,

// s1 = "Hello Jane" and s2 = "Hello my name is Jane" can be made equal by inserting "my name is" between "Hello" and "Jane" in s1.
// s1 = "Frog cool" and s2 = "Frogs are cool" are not similar, since although there is a sentence "s are" inserted into s1, it is not separated from "Frog" by a space.
// Given two sentences sentence1 and sentence2, return true if sentence1 and sentence2 are similar. Otherwise, return false.

 

// Example 1:

// Input: sentence1 = "My name is Haley", sentence2 = "My Haley"

// Output: true

// Explanation:

// sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".

// Example 2:

// Input: sentence1 = "of", sentence2 = "A lot of words"

// Output: false

// Explanation:

// No single sentence can be inserted inside one of the sentences to make it equal to the other.

// Example 3:

// Input: sentence1 = "Eating right now", sentence2 = "Eating"

// Output: true

// Explanation:

// sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.


var areSentencesSimilar = function(sentence1, sentence2) {
    // Split sentences into arrays of words
    const words1 = sentence1.split(" ");
    const words2 = sentence2.split(" ");
    
    // Initialize pointers for the beginning and end of the arrays
    let i = 0; // Start pointer
    let j = 0; // End pointer

    // Check for matching words from the beginning of both sentences
    while (i < words1.length && i < words2.length && words1[i] === words2[i]) {
        i++;
    }

    // Check for matching words from the end of both sentences
    while (j < words1.length - i && j < words2.length - i && words1[words1.length - 1 - j] === words2[words2.length - 1 - j]) {
        j++;
    }
    // If the remaining part of both sentences is identical, they are similar
    return i + j >= Math.min(words1.length, words2.length);
};


console.log(areSentencesSimilar("My name is Haley", "My Haley")) // true