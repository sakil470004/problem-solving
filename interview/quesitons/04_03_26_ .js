41. How does JavaScript handle memory management?

Answer:

JavaScript uses automatic garbage collection.

Main concepts:
- Stack → stores primitive values + function calls
- Heap → stores objects, arrays, functions

Garbage collector uses Mark-and-Sweep algorithm:
- Mark reachable objects.
- Remove unreachable ones.

Memory leak happens when references are kept unintentionally.

Example leak in picture

let arr = [];
function add() {
  arr.push(new Array(1000000));
}


* If arr keeps growing → memory leak.