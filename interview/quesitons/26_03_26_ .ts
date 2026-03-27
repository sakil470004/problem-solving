


// Q. What is type narrowing?
// Reducing a union type to a specific type.
// Example:

function printId(id:string|number){
 if(typeof id === "string"){
  console.log(id.toUpperCase())
 }
}