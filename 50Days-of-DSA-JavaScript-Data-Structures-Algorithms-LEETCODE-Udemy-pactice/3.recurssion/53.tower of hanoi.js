// move disk 1 from rod 1 to rod 3

function toh(N, fromm, to, aux) {
  //Write code here
  // sample print statement below
  //console.log("move disk " + 1 + " from rod " + 1 + " to rod " + 2);
  //in the above statement consider we are moving disk 1 from rod 1 to rod 2
  //remember to return number of moves as well
  // base case
  if (N === 1) {
    console.log("move disk " + N + " from rod " + fromm + " to rod " + to);
    return 1;
  }
  // recursive case
  //   first move N-1 disks from A to B using C as auxilliary
  // then change N-1 disk from auxillary to "to"
  let count = 0;
  count += toh(N - 1, fromm, aux, to);
  console.log("move disk " + N + " from rod " + fromm + " to rod " + to);
  count += toh(N - 1, aux, to, fromm);
  return count + 1;
}

console.log(toh(3, 1, 3, 2)); // 7
