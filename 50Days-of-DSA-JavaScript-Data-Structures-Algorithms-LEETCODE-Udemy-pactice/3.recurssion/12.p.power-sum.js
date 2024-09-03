
// ? Let's define a peculiar type of array in which each element is either an integer or another peculiar array. Assume that a peculiar array is never empty. Write a function that will take a peculiar array as it's input and find the sum of it's elements. If an array is an element in the peculiar array you have to convert it to it's equivalent value so that you can sum it with the other elements. Equivalent value of an array is sum of it's elements raised to the number which represents how far nested it is. for e.g [2,3,[4,1,2]] = 2+3(4+1+2)^2 ,,, another [1,2,[7,[3,4],2]]=1+2+(7+(3+4)^3+2)^2,,,,

const powerSum = (array, power = 1) => {
  let sum = 0;
  //? loop the array . which is also have start and end condition for recursion
  array.forEach((item) => {
    //* if it array recursive to the save function and make loop again else add to sum
    if (Array.isArray(item)) {
      sum += powerSum(item, power + 1);
    } else {
      sum += item;
    }
  });
  return Math.pow(sum,power);
};
const compoundArray = [1, 2, 3, [4, 2], [[2]]];
// ! calcluation look like [1+2+3+(4+2)^2+((2)^2)^3]
const result = powerSum(compoundArray);
console.log(result);

