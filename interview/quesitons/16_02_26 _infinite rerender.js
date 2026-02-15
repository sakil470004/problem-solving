// 24. Debug Scenario: Why is this component re-rendering infinitely?
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = () => {
    setData([1, 2, 3]);
  };

  return <div>{data.length}</div>;
}


// Answer:

// useEffect depends on data

// fetchData() updates data

// Update triggers re-render

// Re-render triggers useEffect again

// Infinite loop.

// Fix:

useEffect(() => {
  fetchData();
}, []);


// Or restructure logic.