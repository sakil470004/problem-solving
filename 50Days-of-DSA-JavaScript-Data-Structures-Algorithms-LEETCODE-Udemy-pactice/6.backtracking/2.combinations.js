// ? Given two integers n and k , return all possible combinations of k numbers chosen from 1 to n... you may return the answer in any order.
//! Example n=4 k=2 . 1,2,3,4 => [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];

var combine = function (n, k) {
  let res = [];
  function helper(start, curr) {
    // *base case
    if (curr.length === k) {
      res.push([...curr]);
      return;
    }
    //*recursive case
    // ? for optimization
    let need = k - curr.length;
// need to n-need+1
    for (let j = start; j <= n - need + 1; j++) {
      curr.push(j);
      helper(j + 1, curr);
      curr.pop();
    }
    // [1] -> [1,2],[1,3],[1,4]
    // [2] -> [2]
    // [3]
    // [4]
  }
  helper(1, []);
  return res;
};

console.log(combine(5, 2));
