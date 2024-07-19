var findTheWinner = function (n, k) {
  // n=3; arr=[1,2,3]
  let array = Array.from({ length: n }, (_, i) => i + 1);
  // console.log(array);
  function helper(arr, startIndex) {
    //* base case
    if (arr.length === 1) {
      return arr[0];
    }

    // *recursive case
    const indexToRemove = (startIndex + k - 1) % arr.length;
    arr.splice(indexToRemove, 1);
    // console.log(arr)
    return helper(arr, indexToRemove);
  }
  return helper(array, 0);
};
const findTheWinner2 = (n, k) => {};
const result = findTheWinner(4, 2);
const result2 = findTheWinner2(4, 2);
console.log(result);
console.log(result2);
