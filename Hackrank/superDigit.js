
function superDigit(n, k) {
 
    function sumOfDigits(num) {
        return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    let initialSum = sumOfDigits(n) * k;
let sum=initialSum;
    while (sum > 9) {
        sum = sumOfDigits(sum);
    }
    return sum;
 
}
const result = superDigit(9875, 4);
console.log(result); // Expected output: 8
