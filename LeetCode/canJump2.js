var jump = function (nums) {
  let sum = 0;
  let count = 0;
  let len = nums.length;
  if (nums[0] === 0 || len === 0 || len < 2) return 0;

  for (let i = 0; i < len; i++) {
    if (len > sum) {
      count++;
    } else {
      break;
    }
    sum = sum + nums[i];
  }
  return count;
};

const result = canJump([2, 3, 1, 1, 4]);
console.log(result); // Expected output: true
