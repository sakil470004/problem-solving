// 1. Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.
var twoSum = function (nums, target) {
  //? create a hash
  let hash = {};
  //? loop through the array
  for (let i = 0; i < nums.length; i++) {
    // console.log(hash);
    if (!hash[nums[i]]) {
      hash[nums[i]] = [i];
    } else {
      hash[nums[i]] = [...hash[nums[i]], i];
    }
  }
  // sort the array
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (nums[left] + nums[right] === target) {
      if (nums[left] !== nums[right]) {
        const leftArray = hash[nums[left]];
        const rightArray = hash[nums[right]];
        return [leftArray[0], rightArray[0]];
      } else {
        return [hash[nums[left]][0], hash[nums[left]][1]];
      }
    } else if (nums[left] + nums[right] > target) {
      right--;
    } else {
      left++;
    }
  }
  return [];
};
console.log(twoSum([2, 7, 11, 15], 9));

function moveZerosToEnd(arr) {
  let j = 0;  // Pointer for the position of the next non-zero element

  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    // If the current element is non-zero
    if (arr[i] !== 0) {
      // Swap arr[i] with arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
      // Increment j to point to the next position for the non-zero element
      j++;
    }
  }

  return arr;
}

function moveZero(arr) {
  let i = 0, j = arr.length - 1;
  while (i < j) {
    if(arr[i]!==0 ){
      i++;
     
    }else if(arr[j]!==0 && arr[i]==0){
      [arr[j],arr[i]]=[arr[i],arr[j]];
    }else if(arr[j]==0){
      j--;
    }else{
      i++;
      j--;
    }
  }

  return arr
}

// Example usage
const arr = [5, 1, 2, 0, 3, 4, 0];
console.log(moveZero(arr));