// https://leetcode.com/problems/find-the-winner-of-the-circular-game/
//? write question line by line
//? 1. There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.
//? 2. The rules of the game are as follows:
//? 3. Start at the 1st friend.
//? 4. Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
//? 5. The last friend you counted leaves the circle and loses the game.
//? 6. If there is still more than one friend in the circle, go back to step 4 starting from the friend immediately clockwise of the friend who just lost and repeat.
//? 7. Else, the last friend in the circle wins the game.
//? 8. Given the number of friends, n, and an integer k, return the winner of the game.
//? 9. Example 1:
//? Input: n = 5, k = 2
//? Output: 3

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
