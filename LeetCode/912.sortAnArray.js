// ? Given an array of integers nums, sort the array in ascending order and return it.You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

// ! example nums=[5,2,3,1]=>[1,2,3,5]

const sortArray = (nums) => {
  //   console.log(nums);
  if (nums.length <= 1) {
    return nums;
  }

  let pivot = [nums[Math.floor(nums.length / 2)]];
  let count = 0;
  let left = [];
  let right = [];

  for (const num of nums) {
    if (num < pivot[0]) {
      left.push(num);
    } else if (num > pivot[0]) {
      right.push(num);
    } else {
      count++;
      if (count > 1) {
        pivot.push(num);
      }
    }
  }
//   console.log(left, right);
  return [...sortArray(left), ...pivot, ...sortArray(right)];
};

const result = sortArray([5, 1, 1, 2, 0, 0]);
console.log(result);
