const towerOFHanoi = (n, source, destination, aux) => {
  let count = 0;
  //   ? helper function
  function helper(N, source, destination, aux) {
    // * base condition
    if (N === 1) {
      count += 1;
      console.log(
        "Move disk " + N + " from rod " + source + " to rod " + destination
      );
      return;
    }
    // * recursion condition
    //? total N-1 disk source ->>> aux
    helper(N - 1, source, aux, destination);
    // ?current Nth disk source ->>> destination
    count += 1;
    console.log(
      "Move disk " + N + " from rod " + source + " to rod " + destination
    );
    //? total N-1 aux --> destination
    helper(N - 1, aux, destination,source);
  }
  helper(n, source, destination, aux);
  return count;
};

const result = towerOFHanoi(2, 1, 3, 2);
console.log("count", result);
