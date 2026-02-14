// 22. What is the output?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}


// Answer:

// 3
// 3
// 3


// Why:
// var is function-scoped. After loop ends, i = 3.
// All callbacks reference the same i.

// Fix:

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}


// Output:

// 0
// 1
// 2


// Block scope solves it.