// ! Approach 1
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
// ! Approach 2
const findTheWinner2 = (n, k) => {
  function josephus(n) {
    //* base case
    if (n === 1) {
      return 0;
    }
    //* recursive case
    return (josephus(n - 1) + k) % n;
  }
  return josephus(n) + 1;
};

// ! approach 3
const findTheWinner3 = (n, k) => {
  let survivor = 0;
  for (let i = 2; i <= n; i++) {
    survivor = (survivor + k) % i;
  }

  return survivor + 1;
};
const result = findTheWinner(6, 2);
const result2 = findTheWinner2(6, 2);
const result3 = findTheWinner2(6, 2);
console.log(result);
console.log(result2);
console.log(result3);
