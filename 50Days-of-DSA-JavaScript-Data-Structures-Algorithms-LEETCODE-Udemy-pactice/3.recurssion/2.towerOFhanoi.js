// * the parameter N is total disk , fromm is which road come from, to is were it will go , aux is helper road
function towerOFHanoi(N, fromm, to, aux) {
  let count = 0;
  //   ? helper function
  function helper(N, fromm, to, aux) {
    // * base case
    if (N === 1) {
      count += 1;
      console.log("Move disk " + N + " from rod " + fromm + " to rod " + to);
      return;
    }
    // * recursive case
    // ? total N-1 disk fromm-> aux
    helper(N - 1, fromm, aux, to);
    // ? Nth disk fromm-> to
    count += 1;
    console.log("Move disk " + N + " from rod " + fromm + " to rod " + to);
    // ?total N-1 aux ->to
    helper(N - 1, aux, to, fromm);
  }
  helper(N, fromm, to, aux);
  return count;
}

const result = towerOFHanoi(2, 1, 3, 2);
console.log("count", result);
