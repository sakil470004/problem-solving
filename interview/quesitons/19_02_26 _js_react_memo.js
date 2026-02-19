// 27. React Performance Question:

// When would you use React.memo?

// Answer:
// Use it when:

// Component renders frequently

// Props rarely change

// Rendering is expensive

const Child = React.memo(({ value }) => {
  console.log("Rendered");
  return <div>{value}</div>;
});


// If value doesn’t change → no re-render.
// Why it matters:

// - Performance optimization

// - Avoid unnecessary renders

// - Improve user experience