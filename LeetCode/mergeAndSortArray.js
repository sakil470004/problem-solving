var merge = function (nums1, m, nums2, n) {
  //for future sakil check this
  //  add last char 0 so add elements from nums2 to nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  // sort the array
  nums1.sort((a, b) => a - b);
  return nums1;
};

const result = merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
console.log(result); // Expected output: [1,2,2,3,5,6]
