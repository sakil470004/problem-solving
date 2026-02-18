// 26. JavaScript: What is prototypal inheritance?

// Answer:
// In JavaScript, objects inherit from other objects.

const person = {
    
    greet() {
        console.log("Hello");
    },
    greetWithName(name) {
        console.log(`Hello ${name}`);
    }
};

const user = Object.create(person);
user.greet(); // Hello
const user2 = Object.create(person);
user2.greetWithName("Alice"); // Hello Alice


// user inherits from person.

// Everything in JS is based on prototype chains.

// Why it matters:

// - Code reuse

// - Dynamic behavior

// - Flexible object creation