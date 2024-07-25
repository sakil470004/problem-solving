// *Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid....   An input string is valid if:=>Open brackets must be closed by the same type of brackets.=>Open brackets must be closed in the correct order.=>Every close bracket has a corresponding open bracket of the same type.

var isValid = function (s) {
  const stack = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const stackArray = [];
  for (let i = 0; i < s.length; i++) {
    if (stack[s[i]]) {
      stackArray.push(s[i]);
    } else {
      const last = stackArray.pop();
      if (s[i] !== stack[last]) {
        return false;
      }
    }
  }
  return stackArray.length === 0;
};

const result = isValid("{()[]}");
console.log(result);
