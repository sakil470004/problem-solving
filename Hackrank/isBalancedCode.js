function isBalanced(s) {
    let stack = [];
    let bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
                return "NO";
            }
        }
    }

    return stack.length === 0 ? "YES" : "NO";
}

// Example usage:
console.log(isBalanced("{[()]}")); // Output: "YES"
console.log(isBalanced("{[(])}")); // Output: "NO"
console.log(isBalanced("{{[[(())]]}}")); // Output: "YES"
