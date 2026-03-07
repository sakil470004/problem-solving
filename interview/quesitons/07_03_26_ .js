// 44. What is the difference between deep copy and shallow copy?

// Answer:

//? Shallow copy copies reference for nested objects.

const obj1 = { a: { b: 1 } };
const obj2 = { ...obj1 };

obj2.a.b = 5;
console.log(obj1.a.b); // 5

//? Deep copy clones everything.

const obj2 = JSON.parse(JSON.stringify(obj1));

//? But JSON method fails for:

- Dates
- Functions
- Undefined

//? Modern way:
structuredClone(obj1);


