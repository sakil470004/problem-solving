var convert = function (s, numRows) {
  const len = s.length;
  if (numRows === 1 || numRows >= len) return s;
//   let rowTrackerArray = Array(s).fill(-1);
  let rowTracker = 0;
  let reverse = false;
  const resultArray=Array(numRows).fill('');
  for (let i = 0; i < len; i++) {
    // rowTrackerArray[i] = rowTracker;
    resultArray[rowTracker] += s[i];
    if (rowTracker === 0) {
      reverse = false;
    } else if (rowTracker === numRows - 1) {
      reverse = true;
    }
    // for reverse I can also 1,-1 to a varible for reverse
    if (reverse) {
      rowTracker--;
    } else {
      rowTracker++;
    }
  }
return resultArray.join('');
};

const result = convert("PAYPALISHIRING", 3);
console.log(result); // PAHNAPLSIIGYIR
