function counterGame(n) {
    // Write your code here
    const players = ['Louise', 'Richard'];
    let player = false;
    while (n > 1) {

        // if n is a power of 2 then divide n by 2 . It's a bit manipulation trick
        if ((n & (n - 1)) === 0) {
        
            n = n / 2;
        } else {
            // if n is not a power of 2 then subtract the largest power of 2 from n
            n = n - Math.pow(2, Math.floor(Math.log2(n)));
        }
        player=!player;
    }
    
    return players[player ? 0 : 1];

}
const result=counterGame(1);
console.log(result); // Expected output: Richard