// 46. Permutations
// Solved
// Medium
// Topics
// Companies
// Given an array nums of distinct integers, return all the possible 
// permutations
// . You can return the answer in any order.

 

// Example 1:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Example 2:

// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
// Example 3:

// Input: nums = [1]
// Output: [[1]]
 
// mynul code 
var permute = function(nums) {
    const results=[];
    const n=nums.length;
    const helper=(index)=>{
        // base condition
        if(index===n-1){
            results.push([...nums]);
        return;
        }
        
        // recursive ``case``
        
        for(let i=index;i<n;i++){
            [nums[i],nums[index]]=[nums[index],nums[i]];
            helper(index+1);
            // revert changes
            [nums[i],nums[index]]=[nums[index],nums[i]];
  
        }
        
    }
    helper(0);
    
    return results;
  };
  
  
  const result = permute([1, 2, 3]);
  console.log(result);
  