function sumXor(n) {
    let count = 0;
    while (n > 0) {
        if (n % 2 === 0) {
            count++;
        }
        n = Math.floor(n / 2);
    }
    return 2 ** count;

}
const result=sumXor(1);
console.log(result); // Expected output: 2