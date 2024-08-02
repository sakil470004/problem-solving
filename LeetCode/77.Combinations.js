// ? Given two integers n and k , return all possible combinations of k numbers chosen from 1 to n... you may return the answer in any order.
// get link from leetcode: https://leetcode.com/problems/combinations/
//! Example n=4 k=2 . 1,2,3,4 => [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];
// n=number k=combination length
var combine = function (n, k) {
  let result = [];
  function helper(start, subArray) {
    // *base condition
    if (subArray.length === k) {
      result.push([...subArray]);
      return;
    }
    //* recursive condition
    //? for optimization
    // to fulfil length fo array length we need
    let lengthNeed = k - subArray.length;
    for (let i = start; i <= n - lengthNeed + 1; i++) {
      subArray.push(i);
      helper(i + 1, subArray);
      subArray.pop();
    }
  }
  helper(1, []);
  return result;
};

console.log(combine(4, 2));
