// var removeDuplicates = function (nums) {
//   const len = nums.length;
//   if (len === 0) return 0;
//   let newArray = [];
//   newArray.push(nums[0]);
//   //   [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
//   for (let i = 1; i < len; i++) {
//     if (nums[i - 1] !== nums[i]) {
//       newArray.push(nums[i]);
//     }
//   }
//   return newArray;
// };
// another way to solve this problem is to use the splice method
var removeDuplicates = function (nums) {
  let currentUniqueIndex=1;
  const len=nums.length;
  for (let i = 0; i < len-1; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[currentUniqueIndex] = nums[i+1];
        currentUniqueIndex++;
    }
  }
 
  return currentUniqueIndex;
};
const result = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
console.log(result); // Expected output: 5
// Time Complexity: O(n)
