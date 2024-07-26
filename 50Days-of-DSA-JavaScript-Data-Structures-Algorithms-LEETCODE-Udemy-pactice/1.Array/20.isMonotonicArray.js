//* https://leetcode.com/problems/monotonic-array/
// write down the question
// isMonotonicArray
// An array is monotonic if it is either monotone increasing or monotone decreasing.
// An array A is monotone increasing if for all i <= j, A[i] <= A[j]. An array A is monotone decreasing if for all i <= j, A[i] >= A[j].
// Return true if and only if the given array A is monotonic.
const isMonoTonicArray = (arr) => {
  if (arr.length < 3) {
    return true;
  }
  let isIncreasing = false;
  let isDecreasing = false;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      isDecreasing = true;
    } else if (arr[i] < arr[i + 1]) {
      isIncreasing = true;
    }
    if (isDecreasing && isIncreasing) {
      return false;
    }
  }
  return true;
};
const isMonoTonicArray2 = (arr) => {
  if (arr.length === 0) {
    return true;
  }
  // we is critaria is broken
  const first = arr[0];
  const last = arr[arr.length - 1];
  if (first === last) {
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] !== arr[i + 1]) {
        return false;
      }
    }
  } else if (first < last) {
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
  } else {
    // first > last
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
  }
  return true;
};

const result = isMonoTonicArray([1, 3, 2]); //time complexity: O(n)//space complexity: O(1)
console.log(result);
const result2 = isMonoTonicArray2([3, 3, 3, 3, 3]); //time complexity: O(n)//space complexity: O(1)
console.log(result2);
// for clerification
// is an empty array monoTonic?//yes
// is an array with one element monoTonic?//yes
