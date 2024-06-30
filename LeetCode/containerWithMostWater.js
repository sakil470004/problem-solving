var maxArea = function (heights) {
  const len = heights.length;
  let left = 0;
  let right = len - 1;
  let maxAreaa = 0;
  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    const area = width * height;
    if (area > maxAreaa) {
      maxAreaa = area;
    }
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxAreaa;
};

const result = maxArea([1,14,6,2,5,4,14,3,7]);
console.log(result); // Expected output: 49
