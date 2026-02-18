// 26. JavaScript: What is prototypal inheritance?

// Answer:
// In JavaScript, objects inherit from other objects.

const person = {
  greet() {
    console.log("Hello");
  }
};

const user = Object.create(person);
user.greet(); // Hello


// user inherits from person.

// Everything in JS is based on prototype chains.