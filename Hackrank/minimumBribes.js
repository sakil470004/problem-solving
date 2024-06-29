function minimumBribes(q) {
    // Total number of bribes
    let bribes = 0;
  
    // Loop through each person in the queue
    for (let i = 0; i < q.length; i++) {
      // Check if the current person has moved more than two positions ahead
      if (q[i] - (i + 1) > 2) {
        console.log("Too chaotic");
        return;
      }
  
      // Count the number of bribes by counting the number of people ahead
      // of q[i] who originally had a higher number than q[i].
      for (let j = Math.max(0, q[i] - 2); j < i; j++) {
        if (q[j] > q[i]) {
          bribes++;
        }
      }
    }
  
    // Output the total number of bribes
    console.log(bribes);
  }
const result = minimumBribes([2, 5, 1, 3, 4]);
console.log(result); // Expected output: 4
