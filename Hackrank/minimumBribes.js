function minimumBribes(q) {
  // Write your code here
  const bribesArray = new Array(q.length + 1).fill(0);
  let bribes = 0;
  for (let i = 0; i < q.length - 1; i++) {
    for (let j = i + 1; j < q.length; j++) {
      if (q[i] > q[j]) {
        bribesArray[q[i]] = bribesArray[q[i]] + 1;
        let temp = q[i];
        q[i] = q[j];
        q[j] = temp;
        // console.log("bribesArray:", bribesArray, "q[i]:", q[i]);
        bribes++;
      }
    }
  }
  for (let i = 0; i < bribesArray.length; i++) {
    if (bribesArray[i] > 2) {
      console.log("Too chaotic");
      return;
    }
  }
  console.log(bribes);
  return;
}
const result = minimumBribes([2, 5, 1, 3, 4]);
console.log(result); // Expected output: 4
