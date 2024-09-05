// * Given a sorted array, create a new array containing squares of all the number of the input array in the sorted order.

const arraySquire = (arr) => {
  let squires = [];
  if (arr.length === 0) {
    return squires;
  }
  // let isNegative = false;
  for (let i = 0; i < arr.length; i++) {
    // if (arr[i] < 0) {
    //   isNegative = true;
    // }
    squires.push(arr[i] * arr[i]);
  }
  // if (!isNegative) {
  //   return squires;
  // }
  return squires.sort((a, b) => a - b);
};
// time complexity: O(nlogn)
// pointer method
const arraySquire2 = (arr) => {
  const resultArray = new Array(arr.length).fill(0);
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const leftSquire = arr[left] * arr[left];
    const rightSquire = arr[right] * arr[right];
    if (leftSquire > rightSquire) {
      resultArray[right - left] = leftSquire;
      left++;
    } else {
      resultArray[right - left] = rightSquire;
      right--;
    }
  }
  return resultArray;
};
// with instructor
const arraySquire3 = (arr) => {
  const newArray = new Array(arr.length).fill(0);
  let leftPointer = 0;
  let rightPointer = arr.length - 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    const leftSquire = Math.pow(arr[leftPointer], 2);
    const rightSquire = Math.pow(arr[rightPointer], 2);
    if (leftSquire > rightSquire) {
      newArray[i] = leftSquire;
      leftPointer++;
    } else {
      newArray[i] = rightSquire;
      rightPointer--;
    }
  }
  return newArray;
};
const result = arraySquire([-4, -1, 0, 3, 10]); //time complexity: O(nlogn)//space complexity: O(n)
const result2 = arraySquire2([-4, -1, 0, 3, 10]); //time complexity: O(n)//space complexity: O(n)
const result3 = arraySquire3([-4, -1, 0, 3, 10]); //time complexity: O(n)//space complexity: O(n)

console.log(result);
console.log(result2);
console.log(result3);
