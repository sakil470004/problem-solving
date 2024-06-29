function maxProfit(prices) {
    // Step 1: Initialize minPrice to a very high value and maxProfit to 0
    let minPrice = Infinity;
    let maxProfit = 0;

    // Step 2: Iterate through each price in the prices array
    for (let i = 0; i < prices.length; i++) {
        // If the current price is lower than minPrice, update minPrice
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        // Otherwise, calculate the profit if we sell at the current price
        } else {
            let profit = prices[i] - minPrice;
            // Update maxProfit if the calculated profit is greater
            if (profit > maxProfit) {
                maxProfit = profit;
            }
        }
    }

    // Step 3: Return the maximum profit found
    return maxProfit;
}

const result = maxProfit([7, 1, 5, 3, 6, 4]);
console.log(result);
