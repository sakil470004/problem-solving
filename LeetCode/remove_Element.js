var removeElement = function (nums, val) {
  let remainingLen = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[remainingLen] = nums[i];
      remainingLen++;
    }
  }
  return remainingLen;
};

const result = removeElement([3, 2, 2, 3], 3);
console.log(result); // Expected output: 2
