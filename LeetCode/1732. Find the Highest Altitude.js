// 1732. Find the Highest Altitude
// There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.

// You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the highest altitude of a point.

 

// Example 1:

// Input: gain = [-5,1,5,0,-7]
// Output: 1
// Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.
// Example 2:

// Input: gain = [-4,-3,-2,-1,4,3,2]
// Output: 0
// Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.
var largestAltitude = function(gain) {
    let max=0;
    let current=0;
    for(let i=0;i<gain.length;i++){
        current+=gain[i];
        max=Math.max(max,current);
    }
    return max;
};
console.log(largestAltitude([-5,1,5,0,-7]));//1


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

