function missingNumber(nums) {
  let n = nums.length + 1;
  let sum = (n * (n + 1)) / 2;
  let arrSum = nums.reduce((a, b) => a + b, 0);
  return sum - arrSum;
}
console.log(missingNumber([1,2,4,5])); // 3