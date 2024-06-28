var removeDuplicates = function (nums) {
  const len = nums.length;
  let count = 1;
  let currentMaxDualIndex = 1;
  for (let i = 0; i < len - 1; i++) {
    if (count === 2 && nums[i] === nums[i + 1]) {
      continue;
    }
    if (nums[i] === nums[i + 1]) {
      count++;
        nums[currentMaxDualIndex] = nums[i + 1];
        currentMaxDualIndex++;
    } else {
      nums[currentMaxDualIndex] = nums[i + 1];
      currentMaxDualIndex++;
      count = 1;
    }
  }
    return currentMaxDualIndex;
};
const result = removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]);
console.log(result); // Expected output: 7
