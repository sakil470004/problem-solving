// 432. All O`one Data Structure
// Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

// Implement the AllOne class:

// AllOne() Initializes the object of the data structure.
// inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
// dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
// getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
// getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
// Note that each function must run in O(1) average time complexity.



// Example 1:

// Input
// ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
// [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
// Output
// [null, null, null, "hello", "hello", null, "hello", "leet"]

// Explanation
// AllOne allOne = new AllOne();
// allOne.inc("hello");
// allOne.inc("hello");
// allOne.getMaxKey(); // return "hello"
// allOne.getMinKey(); // return "hello"
// allOne.inc("leet");
// allOne.getMaxKey(); // return "hello"
// allOne.getMinKey(); // return "leet"

var AllOne = function () {
    this.map = {};
    this.keys = [];
    this.values = [];

};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) {
    if (this.map[key]) {
        this.map[key]++;
        let index = this.keys.indexOf(key);
        this.values[index]++;
    } else {
        this.map[key] = 1;
        this.keys.push(key);
        this.values.push(1);
    }
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function (key) {
        if(this.map[key] > 1){
            this.map[key]--;
            let index = this.keys.indexOf(key);
            this.values[index]--;
        }
        else{
            delete this.map[key];
            let index = this.keys.indexOf(key);
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {
    let max = Math.max(...this.values);
    let index = this.values.indexOf(max);
    return this.keys[index]?this.keys[index]:"";

};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {
    let min = Math.min(...this.values);
    let index = this.values.indexOf(min);
    return this.keys[index]?this.keys[index]:"";
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */