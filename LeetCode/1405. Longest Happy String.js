// 1405. Longest Happy String

// A string s is called happy if it satisfies the following conditions:
// s only contains the letters 'a', 'b', and 'c'.
// s does not contain any of "aaa", "bbb", or "ccc" as a substring.
// s contains at most a occurrences of the letter 'a'.
// s contains at most b occurrences of the letter 'b'.
// s contains at most c occurrences of the letter 'c'.
// Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. If there is no such string, return the empty string "".

// A substring is a contiguous sequence of characters within a string.
// Example 1:
// Input: a = 1, b = 1, c = 7
// Output: "ccaccbcc"
// Explanation: "ccbccacc" would also be a correct answer.
// Example 2:

// Input: a = 7, b = 1, c = 0
// Output: "aabaa"
// Explanation: It is the only correct answer in this case.

var longestDiverseString = function(a, b, c) {
    const heap = new MaxHeap();
    if (a > 0) heap.insert([a, 'a']);
    if (b > 0) heap.insert([b, 'b']);
    if (c > 0) heap.insert([c, 'c']);

    let result = '';
    
    while (heap.size() > 0) {
        let first = heap.extractMax();
        if (result.length >= 2 && result[result.length - 1] === first[1] && result[result.length - 2] === first[1]) {
            if (heap.size() === 0) break;
            let second = heap.extractMax();
            result += second[1];
            second[0]--;
            if (second[0] > 0) heap.insert(second);
            heap.insert(first);
        } else {
            result += first[1];
            first[0]--;
            if (first[0] > 0) heap.insert(first);
        }
    }
    return result;
};

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    insert(pair) {
        this.heap.push(pair);
        this.bubbleUp();
    }

    extractMax() {
        if (this.size() <= 1) return this.heap.pop();
        let max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return max;
    }

    bubbleUp() {
        let index = this.size() - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] >= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let largest = index;

            if (leftChildIndex < this.size() && this.heap[leftChildIndex][0] > this.heap[largest][0]) {
                largest = leftChildIndex;
            }

            if (rightChildIndex < this.size() && this.heap[rightChildIndex][0] > this.heap[largest][0]) {
                largest = rightChildIndex;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
};
