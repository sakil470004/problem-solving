//? * Given a sorted array, create a new array containing squares of all the number of the input array in the sorted order.
const arraySquire = (arr) => {
  const newArray = new Array(arr.length).fill(0);
  let leftPointer = 0;
  let rightPointer = arr.length - 1;
  for (let i = 0; i < arr.length; i++) {
    const leftSquire = Math.pow(arr[leftPointer], 2);
    const rightSquire = Math.pow(arr[rightPointer], 2);
    if (leftSquire < rightSquire) {
      newArray[i] = leftSquire;
      leftPointer++;
    } else {
      newArray[i] = rightSquire;
      rightPointer--;
    }
  }
  return newArray;
};

const result = arraySquire([-4, -1, 0, 3, 10]); //time complexity: O(n)//space complexity: O(n)
console.log(result);
