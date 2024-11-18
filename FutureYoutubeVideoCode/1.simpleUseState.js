let useState = (initialData) => {
    let state = { value: initialData }; // Use an object to store mutable state
    let setData = (newData) => {
        state.value = newData; // Mutate the value in the object
        console.log("State updated:", state.value);
    };
    return [state, setData];
};

const [data, setData] = useState(0);
console.log("Initial state:", data.value); // Access the value using data.value

setData(10); // Update the state
console.log("Updated state:", data.value); // Access the updated value

