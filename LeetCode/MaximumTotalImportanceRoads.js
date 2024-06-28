var maximumImportance = function (n, roads) {
  let importance = new Array(n).fill(0);
  for (let i = 0; i < roads.length; i++) {
    for (let j = 0; j < roads[i].length; j++) {
      const index = roads[i][j];
      importance[index]++;
    }
  }
};

const result = maximumImportance(5, [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2],
  [1, 3],
  [2, 4],
]);
