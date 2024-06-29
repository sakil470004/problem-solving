var majorityElement = function (nums) {
    // sort
  const sortedNums = nums.sort((a, b) => a - b);
  let majorityElement = sortedNums[0];
  let newElement = sortedNums[0];
  let majorityCount = 1;
  let count = 0;
  const len = sortedNums.length;
  for (let i = 1; i < len; i++) {
    if (sortedNums[i] === majorityElement) {
      majorityCount++;
    } else {
      newElement = sortedNums[i];
      count++;
      if (count > majorityCount) {
        majorityElement = newElement;
        majorityCount = count;
        count = 0;
      }
    }
  }
    return majorityElement;
};

const result = majorityElement([3,2,3]);
console.log(result);
