const isMonoTonicArray = (arr) => {
  if (arr.length < 3) {
    return true;
  }
  let isIncreasing = false;
  let isDecreasing = false;
  for (let i = 0; i < arr.length - 2; i++) {
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

const result = isMonoTonicArray([4, 4, 3, 2, 1]); //time complexity: O(n)//space complexity: O(1)
console.log(result);
const result2 = isMonoTonicArray2([3, 3, 3, 3, 3]); //time complexity: O(n)//space complexity: O(1)
console.log(result2);
// for clerification
// is an empty array monoTonic?//yes
// is an array with one element monoTonic?//yes
