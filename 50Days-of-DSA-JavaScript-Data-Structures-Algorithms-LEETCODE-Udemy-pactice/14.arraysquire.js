const arraySquire = (arr) => {
  let squires = [];
  if (arr.length === 0) {
    return squires;
  }
  let isNegative = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      isNegative = true;
    }
    squires.push(arr[i] * arr[i]);

  }
    if (!isNegative) {
        return squires;
    }
    return squires.sort((a, b) => a - b);
};

const result = arraySquire([-4, -1, 0, 3, 10]);
console.log(result);