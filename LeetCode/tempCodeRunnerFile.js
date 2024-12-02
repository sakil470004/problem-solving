var combinationSum3 = function (k, n) {
//     let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//     const result = [];
//     let helper = (index, subArray, curr) => {
//         // base case
//         if (subArray.length === k && curr === n) {
//             result.push([...subArray]);
//             return;
//         }
//         if (subArray.length > k || curr > n) {
//             return;
//         }
//         // recursive case
//         for (let i = index; i <= 9; i++) {
//             subArray.push(array[i]);
//             helper(i + 1, subArray, curr +array[i]);// i+1 because we are starting from 1
//             subArray.pop();
//         }
//     }
//     helper(0, [], 0);
//     return result;
// };