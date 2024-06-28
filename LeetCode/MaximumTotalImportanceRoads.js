function maximumImportance(n, roads) {
  // Step 1: Calculate the degree/frequencee of each city
  const degree = new Array(n).fill(0);
  for (const [a, b] of roads) {
    degree[a]++;
    degree[b]++;
  }
  //step:2  give degree to each city// where city is index
  const degreeGivenIndex = degree.map((deg, idx) => [deg, idx]);
//   console.log("degree", degree);
//   console.log("degree Given Index", degreeGivenIndex);
  //   sort city based on degree
  const sortedCities = degreeGivenIndex.sort((a, b) => b[0] - a[0]);

//   console.log("SortedCity", sortedCities);
  // Step 3: Assign importance to each city
  const importance = new Array(n);
  let currentImportance = n;
  //   as i already sorted the [degree,city] array based on degree so i will give importance to each city based on degree
  for (const [deg, city] of sortedCities) {
    importance[city] = currentImportance;
    currentImportance--;
  }
//   console.log("importance", importance);
  // Step 4: Calculate the total importance of all roads as both road consist for two cities and each city has importance  and importance of city is already calculated in step 3 . So, I will add the importance of both cities for each road. // here, city is index which given as reads
  let totalImportance = 0;
  for (const [a, b] of roads) {
    totalImportance += importance[a] + importance[b];
  }

  return totalImportance;
}

const result = maximumImportance(5, [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2],
  [1, 3],
  [2, 4],
]);
console.log(result);
