function powerSum(array, power = 1) {
  let sum = 0;
  //  ? loop the array. Which also have start and end condition. for recursion
  array.forEach((item) => {
    if (Array.isArray(item)) {
      sum += powerSum(item, power + 1);
    } else {
      sum += item;
    }
  });

  return Math.pow(sum, power);
}
const compoundArray = [1, 2, 3, [4, 2], [[2]]];
// ! calcluation look like [1+2+3+(4+2)^2+((2)^2)^3]
const result = powerSum(compoundArray);
console.log(result);
