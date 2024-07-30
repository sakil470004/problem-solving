// ? Given an integer array of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. return the solution in any order.
// *test case=> [1,7] . powerset=[[],[1],[7],[1,7]]=>(2^n)
//! there is 2 ways solution 1.Iteratively 2.Recursively

const powerSet = (array) => {
  const len = array.length;
  let results = [];
  const helper = (array, i, subset) => {
    // *base condition
    if (i === len) {
      results.push([...subset]);
      return;
    }
    //* recursive condition
    //?--- exclude------
    helper(array, i + 1, subset);
    //?----include-------
    subset.push(array[i]);
    console.log(subset);
    //? iteration
    helper(array, i + 1, subset);
    // ?backtracking for next
    subset.pop();
  };
  helper(array, 0, []);
  return results;
};
const result = powerSet([1, 2, 3]);
console.log(result);
