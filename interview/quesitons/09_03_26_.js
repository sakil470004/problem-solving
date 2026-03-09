//? 46. What is the difference between call, apply, and bind?

//! Answer:

//! They control this.

function greet() {
  console.log(this.name);
}

const user = { name: "Mynul" };

greet.call(user);   // Mynul
greet.apply(user);  // Mynul
const newFn = greet.bind(user);
newFn();            // Mynul

//? Difference:
//? call → arguments separated
//? apply → arguments as array
//? bind → returns new function



