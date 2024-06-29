var majorityElement = function (nums) {
  // sort the array
  const sortedNums = nums.sort((a, b) => a - b);
  // for majority element
  let majorityElement = sortedNums[0];
  let majorityCount = 1;
  // for new element to check//it will check if the new element is majority element or not
  let newElement = sortedNums[0];
  let count = 0;
  const len = sortedNums.length;
  for (let i = 1; i < len; i++) {
    if (sortedNums[i] === majorityElement) {
      majorityCount++;
    } else {
      newElement = sortedNums[i];
      count++;
      //   if the count is greater than majority count then update the majority element
      if (count > majorityCount) {
        majorityElement = newElement;
        majorityCount = count;
        count = 0;
      }
    }
  }
  return majorityElement;
};

const result = majorityElement([3, 2, 3]);
console.log(result);
