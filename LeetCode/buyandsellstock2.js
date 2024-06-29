var maxProfit = function (prices) {
  let maxProfit = 0;
  let minPrice = 0;
  const len = prices.length;

  for (let i = 0; i < len - 1; i++) {
    // If the current price is lower than the next price, buy the stock and sell it at the next price
    if (prices[i] < prices[i + 1]) {
      minPrice = prices[i];
      maxProfit += prices[i + 1] - minPrice;
    }
  }
  return maxProfit;
};
const result = maxProfit([1, 2, 3, 4, 5]);
console.log(result); // Expected output: 7
