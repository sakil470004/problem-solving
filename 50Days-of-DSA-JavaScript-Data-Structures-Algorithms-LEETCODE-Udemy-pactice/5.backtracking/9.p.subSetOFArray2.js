// ? Given an integer array nums that may contain duplicates, return all possible subset(the power set). The solution set must not contain duplicate subsets. Return the solution in any order.
//! Example =>[1,2,2]=> [[],[1],[1,2],[1,2,2],[2],[2,2]];
// ! there is 2 ways solution 1.Iteratively 2.Recursively

const subsetWithDuplicate = (array) => {
  const len = array.length;
  array.sort((a, b) => a - b);

  let results = [];
  const helper = (i, subsets) => {
    // ? base condition
    if (i ===len) {
      results.push([...subsets]);
      return;
    }
    // ? recursive condition
    //*include
    subsets.push(array[i]);
    helper(i + 1, subsets);
    //*backtracking
    subsets.pop();
    //*exclude
    while (i < len && array[i] === array[i + 1]) {
      i++;
    }
    helper(i + 1, subsets);
  };
  helper(0, []);
  return results;
};

const result = subsetWithDuplicate([1, 3, 3]);
console.log(result);
