const findTheWinner5 = function (n, k) {
  const helper = (n) => {
    if (n === 1) {
      return 0;
    }

    return (helper(n - 1) + k) % n;
  };
  return helper(n) + 1;
};
const findTheWinner6 = function (n, k) {

  // we are adding 1 because we are starting from 0 . so we don't need to iterate 1. we can do that from 2
  let survivor = 0;
  for (let i = 2; i <= n; i++) {
    // change the position of survivor// i working as n
    survivor = (survivor + k) % i;
  }
  return survivor + 1;
};

console.log(findTheWinner6(5, 2)); // 3
