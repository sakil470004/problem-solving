// 47. Explain how React’s useEffect dependency array works internally.

// Answer:

//? React compares dependency values using Object.is().

//? If reference changes → effect runs.

// Example:

useEffect(() => {}, [{ a: 1 }]);

//? This runs every render because object reference changes.

//! Correct approach:

const obj = useMemo(() => ({ a: 1 }), []);

//? Reference stability matters.




