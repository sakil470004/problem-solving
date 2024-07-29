// ? given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
//* test case
//! [1,1,2]=> [[1,1,2],[1,2,1],[2,1,1]]
const permuteUnique = (numbers) => {
  let results = [];
  const n = numbers.length;
  const helper = (i) => {
    // *base case
    if (i === n - 1) {
      results.push([...numbers]);
      return;
    }
    //*recursive case
    let hash = {};
    for (let j = i; j < n; j++) {
      // ! add hash to hash table so that we can skip the duplicate element
      if (!hash[numbers[j]]) {
        hash[numbers[j]] = 1;
        // !swap element;
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        //! recursive to the branch
        helper(i + 1);
        //! backtracking to the branch as it's previous state
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; //* revert changes for to fix array
      }
    }
  };
  helper(0);
  return results;
};

const result = permuteUnique([1, 3, 3]);
console.log(result);
