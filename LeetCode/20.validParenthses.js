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
