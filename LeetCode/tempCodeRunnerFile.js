var StockSpanner = function() {
    // Stack to store [price, span] pairs
    this.stack = [];
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    // Initialize span as 1 (current day)
    let span = 1;
    
    // While stack is not empty and current price is greater 
    // or equal to the top of the stack
    while (this.stack.length > 0 && price >= this.stack[this.stack.length - 1][0]) {
        // Add the span of previous days
        span += this.stack.pop()[1];
    }
    
    // Push current price and its span to the stack
    this.stack.push([price, span]);
    
    // Return the span
    return span;
};