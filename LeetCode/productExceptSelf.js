var productExceptSelf = function (nums) {
  let total = 1;
  let zeroCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      zeroCount++;
    } else {
      total *= nums[i];
    }
  }
  if (zeroCount > 1) {
    return Array(nums.length).fill(0);
  } else if (zeroCount === 1) {
    return nums.map((num) => (num === 0 ? total : 0));
  } else {
    console.log("total", total);
    const result = [];
    for (let i = 0; i < nums.length; i++) {
      result.push(total / nums[i]);
    }
    return result;
  }
};

const result = productExceptSelf([4, 3, 2, 1, 2]);
console.log(result);
