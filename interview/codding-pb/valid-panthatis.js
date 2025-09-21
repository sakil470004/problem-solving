// 🔹 Problem 3: Valid Parentheses

// Q: Check if parentheses in a string are valid.

function isValid(s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
    console.log(stack);
  }
  return stack.length === 0;
}
console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false