// 23. Deep React: Why do functions inside components get recreated on every render?

// Answer:
// Because functional components are just functions.
// Every render = component function runs again.
// That means new function references are created.

function MyComponent() {
  const handleClick = () => {};
}


// handleClick is recreated each render.

// Impact:
// If passed to child component → unnecessary re-renders.

// Solution:
// Use useCallback when needed.