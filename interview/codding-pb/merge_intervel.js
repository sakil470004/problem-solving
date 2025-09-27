function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  
  let result = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    let prev = result[result.length - 1];
    let curr = intervals[i];
    
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      result.push(curr);
    }
  }
  
  return result;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
// [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]));
// [[1,5]]