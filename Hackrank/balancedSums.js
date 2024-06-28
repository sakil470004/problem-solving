function balancedSums(arr) {
  let sum1 = 0;
  let sum2 = 0;
  const totalSum = arr.reduce((acc, curr) => acc + curr, 0);
  for (let i = 0; i < arr.length; i++) {
    const currentIndex = i;
    sum1 = 0;
    sum2 = 0;
    const removeMiddle = totalSum - arr[currentIndex];
    for (let j = 0; j < currentIndex; j++) {
      sum1 += arr[j];
    }
    sum2 = removeMiddle - sum1;
    if (sum1 === sum2) {
      return "YES";
    } else if (sum1 > sum2) {
      return "NO";
    }
    
  }
  return "NO";
}
const result = balancedSums([5, 6, 8, 10]);
console.log(result); // Expected output: YES
