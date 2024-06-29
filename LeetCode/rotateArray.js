var rotate = function (nums, k) {
  // creating a new array
  const newArray = new Array(nums.length + k);
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    newArray[(i + k) % len] = nums[i];
  }
  for (let i = 0; i < len; i++) {
    nums[i] = newArray[i];
  }
  console.log(nums)
  return;
};
const result = rotate([1, 2, 3, 4, 5, 6, 7], 3);
