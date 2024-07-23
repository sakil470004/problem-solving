// ? given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
//* test case
//! [1,1,2]=> [[1,1,2],[1,2,1],[2,1,1]]

var permuteUnique = function (nums) {
  //
  var res = [];
  const n = nums.length;
  var permutations = function (index) {
    //*base case
    if (index === n - 1) {
      res.push([...nums]);
      return;
    }
    //* recursive case
    var hash = {};
    for (let j = index; j < n; j++) {
      if (!hash[nums[j]]) {
        // ! add hash to hash table
        hash[nums[j]] = 1;
        // !swap element;
        [nums[index], nums[j]] = [nums[j], nums[index]];
        //! recursive to the branch
        permutations(index + 1);
        //! backtracking to the branch as it's previous state
        [nums[index], nums[j]] = [nums[j], nums[index]]; //* revert changes for to fix array
      }
    }
  };
  permutations(0);
  return res;
};
const result = permuteUnique([1, 1,2]);
console.log(result);
