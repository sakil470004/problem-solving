// Coding Exercise: 01 Knapsack
// You are provided with a set of N items, each with a specified weight and value. Your objective is to pack these items into a backpack with a weight limit of W, maximizing the total value of items in the backpack. Specifically, you have two arrays: val[0..N-1], representing the values of the items, and wt[0..N-1], indicating their weights. Additionally, you have a weight limit W for the backpack. The challenge is to determine the most valuable combination of items where the total weight does not exceed W. Note that each item is unique and indivisible, meaning it must be either taken as a whole or left entirely.

// Input:
// N = 3
// W = 8
// values[] = [2,3,9]
// weight[] = [8,2,5]
// Output: 12
// Explanation: Choose the last 2 items that weighs 2 and 5 units respectively and hold values 3 and 9 that add up to 12. 


function knapSack(W, wt, val, n) {
    // for time need for this problem is 2^n
    console.time('knapSack');
    //Write Code here
    const helper = (index, remWeight) => {
        //base condition 
        if (index >= n || remWeight === 0) {
            return 0;
        }

        let exclude = helper(index + 1, remWeight);
        let include = 0;
        if (wt[index] <= remWeight) {
            include = val[index] + helper(index + 1, remWeight - wt[index]);
        }
        return Math.max(include, exclude);

    }
    console.timeEnd('knapSack');
    return helper(0, W);
}

function knapSack2(W, wt, val, n) {
    console.time('knapSack2');
    const dp = Array.from({ length: n }, () => Array(W + 1).fill(-1));

    const helper = (index, remWeight) => {
        if (index >= n || remWeight === 0) {
            return 0;
        }
        if (dp[index][remWeight] !== -1) {
            return dp[index][remWeight];
        }
        let exclude = helper(index + 1, remWeight);
        let include = 0;
        if (wt[index] <= remWeight) {
            include = val[index] + helper(index + 1, remWeight - wt[index]);
        }
        dp[index][remWeight] = Math.max(include, exclude);
        return dp[index][remWeight];
    }
    console.timeEnd('knapSack2');
    return helper(0, W);
}



console.log(knapSack(8, [8, 2, 5], [2, 3, 9], 3)); //12
console.log(knapSack2(8, [8, 2, 5], [2, 3, 9], 3)); //12