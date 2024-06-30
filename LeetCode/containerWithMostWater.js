var containerWithMostWater = function (heights) {
  const len = heights.length;
  let left = 0;
  let right = len - 1;
  let maxArea = 0;
  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    const area = width * height;
    if (area > maxArea) {
      maxArea = area;
    }
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
};

const result = containerWithMostWater([1,14,6,2,5,4,14,3,7]);
console.log(result); // Expected output: 49
