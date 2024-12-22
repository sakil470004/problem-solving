// 714. Best Time to Buy and Sell Stock with Transaction Fee

// You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

// Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

// Note:

// You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
// The transaction fee is only charged once for each stock purchase and sale.
 

// Example 1:

// Input: prices = [1,3,2,8,4,9], fee = 2
// Output: 8
// Explanation: The maximum profit can be achieved by:
// - Buying at prices[0] = 1
// - Selling at prices[3] = 8
// - Buying at prices[4] = 4
// - Selling at prices[5] = 9
// The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
// Example 2:

// Input: prices = [1,3,7,5,10,3], fee = 3
// Output: 6
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
// solve using claude + my own understanding
var maxProfit = function(prices, fee) {
    let hold = -prices[0];  // Maximum profit if we're holding a stock
    let free = 0;          // Maximum profit if we're not holding anything
    
    for(let i = 1; i < prices.length; i++) {
        // Best profit if holding stock: either keep previous stock or buy new stock
        let prevHold = hold;
        hold = Math.max(hold, free - prices[i]);
        
        // Best profit if not holding: either keep free or sell current stock
        free = Math.max(free, prevHold + prices[i] - fee);
    }
    
    return free; // Final answer is maximum profit without holding stock
}
console.log(maxProfit([1,3,2,8,4,9], 2)) // 8   (buy at 1, sell at 8, buy at 4, sell at 9)

