// 155. Min Stack
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

// Implement the MinStack class:

// MinStack() initializes the stack object.
// void push(int val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.
// You must implement a solution with O(1) time complexity for each function.

// Example 1:

// Input
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]

// Output
// [null,null,null,null,-3,null,0,-2]

// Explanation
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); // return -3
// minStack.pop();
// minStack.top();    // return 0
// minStack.getMin(); // return -2

// final code
class MinStack {
    constructor() {
        this.stack = []; // Main stack to store elements
        this.minStack = []; // Stack to store minimum elements
    }

    push(x) {
        this.stack.push(x);
        if (this.minStack.length === 0 || x <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(x);
        }
    }

    pop() {
        let poppedValue = this.stack.pop();
        if (poppedValue === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}



// Mynul Modified Code
const MinStack = function (commands, value) {
  const stack = [];
  const minStack = [];
  const result = [];
  const len = commands.length;
  if (stack.length === 0) {
    return null;
  }

  const push = (val) => {
    stack.push(val);
    minStack.push(val);
  };
  const pop = (val) => {
    stack.pop();
    minStack.pop();
  };
  const top = (val) => {
    return stack[stack.length - 1];
  };
  const getMin = () => {
    return Math.min(...minStack);
  };
  const funs = {
    push,
    pop,
    top,
    getMin,
    MinStack: () => {
      return null;
    },
  };

  const helper = (commandNumber, val) => {
    // base case
    if (commandNumber >= len) {
      return;
    }
    // recursive case
    const command = commands[commandNumber];
    let funsValue = funs[command](val);
    result.push(funsValue);
    helper(commandNumber + 1, val);
  };
  helper(0, value);
  return result;
};

console.log(
  MinStack(
    ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
    [[], [-2], [0], [-3], [], [], [], []]
  )
); // [null,null,null,null,-3,null,0,-2]
