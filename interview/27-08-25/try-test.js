console.log(x); // undefined
var x = 5;
// 4. What is a closure?

// A function that “remembers” variables from its outer scope even after the outer function has finished.

function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
