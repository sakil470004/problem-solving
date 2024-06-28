function dynamicArray(n, queries) {
    let sequences = Array.from({ length: n }, () => []);
    let lastAnswer = 0;
    let results = [];

    // Process each query
    for (let i = 0; i < queries.length; i++) {
        let [queryType, x, y] = queries[i];
        let idx = (x ^ lastAnswer) % n;

        if (queryType === 1) {
            sequences[idx].push(y);
        } else if (queryType === 2) {
            let value = sequences[idx][y % sequences[idx].length];
            lastAnswer = value;
            results.push(lastAnswer);
            console.log(value,lastAnswer);
            
        }
    }

    return results;
}
const result= dynamicArray(2,[[1,0,5],[1,1,7],[1,0,3],[2,1,0],[2,1,1]]);
console.log(result)