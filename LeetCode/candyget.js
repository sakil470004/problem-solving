var candy = function(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);
    
    // Left to right pass
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    
    // Right to left pass
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    
    // Sum up the candies
    return candies.reduce((sum, candy) => sum + candy, 0);
};

const ratings = [1,0,2];
const result = candy(ratings);
console.log(result);