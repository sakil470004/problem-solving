var canAliceWin = function (nums) {
  let singleDNum = 0;
  let doubleDNum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 10) {
      singleDNum = singleDNum + nums[i];
    } else {
      doubleDNum = doubleDNum + nums[i];
    }
  }
  console.log(singleDNum, doubleDNum);
  if (singleDNum !== doubleDNum) {
    return true;
  } else {
    return false;
  }
};
const result = canAliceWin([1,2,3,4,10]);
console.log(result);
