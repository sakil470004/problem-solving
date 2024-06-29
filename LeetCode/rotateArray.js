var rotate = function (nums, k) {
  // creating a new array to store the rotated array
  const newArray = new Array(nums.length + k);
  const len = nums.length;
  //   shifting the array to the right and storing it in the new array
  for (let i = 0; i < len; i++) {
    newArray[(i + k) % len] = nums[i];
  }
  //   copying the new array to the original array
  for (let i = 0; i < len; i++) {
    nums[i] = newArray[i];
  }
  return;
};
const result = rotate([1, 2, 3, 4, 5, 6, 7], 3);
