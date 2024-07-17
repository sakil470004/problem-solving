// solve 5,4,3,2,1,1,2,3,4,5
const recursiveFunction = (n) => {
  if (n === 0) {
    return;
  }
  console.log(n);
  recursiveFunction(n - 1);
  console.log(n);
  return;
};
 recursiveFunction(5);
