function maxMin(k, arr) {
  // sort the array
  const sortedArr = arr.sort((a, b) => a - b);
  let minUnfairness = Infinity;
  for (let i = 0; i <= sortedArr.length - k; i++) {
    // check sub array first and last element
    const unfairness = sortedArr[i + k - 1] - sortedArr[i];
    if (unfairness < minUnfairness) {
      minUnfairness = unfairness;
    }
  }
  return minUnfairness;
}

const k = 4;
const arr = [1, 2, 3, 4, 10, 20, 30, 40, 100, 200];
const result = maxMin(k, arr);
console.log(result); 