

// Question. What is the difference between call, apply, and bind?

//? How: All three control the value of this.

//1. call
fn.call(obj, arg1, arg2)

//2. apply
fn.apply(obj, [arg1, arg2])

//3. bind
const newFn = fn.bind(obj)

//! Key difference:
//? call and apply execute immediately
//?  bind returns a new function with the this value set, but does not execute it immediately. You can call the new function later. 
 
 
