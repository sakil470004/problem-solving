// ? given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
//! if array is given to us is => [1,2,3] the possible ans is [1,2,3] & [1,3,2] & [2,1,3] & [2,3,1] & [3,1,2] & [3,2,1]
// for 3 number 3! for 4 number 4!;
//? clarifying question.
// ? What if nums is empty ?=> should I return an empty array

var permute = (numbers) => {
  let results = [];
  let n = numbers.length;
  function helper(i) {
    // *base condition
    if (i === n - 1) {
      results.push([...numbers]);
      return;
    }
    // * recursive case
    for (let j = i; j < n; j++) {
        // ! swap element
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        // ? recursive to the branch
        helper(i + 1);
        // ? backtracking to the branch as it's previous state// revert changes for to fix array
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  }
  helper(0);
  return results;
};

const result = permute([1, 2, 3]);
console.log(result);
