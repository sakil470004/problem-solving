class RandomizedSet {
    constructor() {
        this.map = new Map();
        this.list = [];
    }
    
    insert(val) {
        if (this.map.has(val)) {
            return false;
        }
        this.map.set(val, this.list.length);
        this.list.push(val);
        return true;
    }
    
    remove(val) {
        if (!this.map.has(val)) {
            return false;
        }
        const index = this.map.get(val);
        const lastElement = this.list[this.list.length - 1];
        
        // Swap the element with the last element
        this.list[index] = lastElement;
        this.map.set(lastElement, index);
        
        // Remove the last element
        this.list.pop();
        this.map.delete(val);
        
        return true;
    }
    
    getRandom() {
        const randomIndex = Math.floor(Math.random() * this.list.length);
        return this.list[randomIndex];
    }
}

// Example usage:
const randomizedSet = new RandomizedSet();
console.log(randomizedSet.insert(1)); // true
console.log(randomizedSet.remove(2)); // false
console.log(randomizedSet.insert(2)); // true
console.log(randomizedSet.getRandom()); // 1 or 2
console.log(randomizedSet.remove(1)); // true
console.log(randomizedSet.insert(2)); // false
console.log(randomizedSet.getRandom()); // 2



// const createRandomizedSet = (() => {
//     const map = new Map();
//     const list = [];
    
//     const insert = (val) => {
//         if (map.has(val)) {
//             return false;
//         }
//         map.set(val, list.length);
//         list.push(val);
//         return true;
//     };
    
//     const remove = (val) => {
//         if (!map.has(val)) {
//             return false;
//         }
//         const index = map.get(val);
//         const lastElement = list[list.length - 1];
        
//         // Swap the element with the last element
//         list[index] = lastElement;
//         map.set(lastElement, index);
        
//         // Remove the last element
//         list.pop();
//         map.delete(val);
        
//         return true;
//     };
    
//     const getRandom = () => {
//         const randomIndex = Math.floor(Math.random() * list.length);
//         return list[randomIndex];
//     };
    
//     return {
//         insert,
//         remove,
//         getRandom
//     };
// })();

// // Example usage:
// console.log(createRandomizedSet.insert(1)); // true
// console.log(createRandomizedSet.remove(2)); // false
// console.log(createRandomizedSet.insert(2)); // true
// console.log(createRandomizedSet.getRandom()); // 1 or 2
// console.log(createRandomizedSet.remove(1)); // true
// console.log(createRandomizedSet.insert(2)); // false
// console.log(createRandomizedSet.getRandom()); // 2
