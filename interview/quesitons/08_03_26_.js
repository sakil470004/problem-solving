45. Explain how closures can cause bugs in React.

Answer: 

//? Closures capture stale values.

// Example:

useEffect(() => {
  setInterval(() => {
    console.log(count);
  }, 1000);
}, []);

//? count will always log initial value.

//! Fix:

useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, []);

//? Or add dependency properly.