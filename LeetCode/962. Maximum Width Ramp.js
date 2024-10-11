// 962. Maximum Width Ramp
// Medium
// Topics
// Companies
// A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.

// Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

 

// Example 1:

// Input: nums = [6,0,8,2,1,5]
// Output: 4
// Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
// Example 2:

// Input: nums = [9,8,1,0,1,9,4,0,4,1]
// Output: 7
// Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
 
var smallestChair = function(times, targetFriend) {
    let currentOccupiedTill = -1;
    let minHeap = new MinPriorityQueue({ priority: (person) => person.chair });
    
    let chairsAssigned = new Map();
    
    let timeSplitArr = [];
    
    for(let timeInd = 0; timeInd < times.length; timeInd++) {
        timeSplitArr.push({ time: times[timeInd][0], type: 'arrival', person: timeInd });
        timeSplitArr.push({ time: times[timeInd][1], type: 'dept', person: timeInd });
    }
    
    timeSplitArr.sort((a, b) => {
        if(a.time !== b.time) {
            return a.time - b.time;
        } else if(a.type === 'dept') {
            return -1;
        } else {
            return 1;
        }
    });
    
    for(let friend of timeSplitArr) {
        
        if(friend.type === 'arrival') {
            if(minHeap.size() === 0) {
                currentOccupiedTill++;
                
                if(friend.person === targetFriend) return currentOccupiedTill;
                
                chairsAssigned.set(friend.person, currentOccupiedTill);
            } else {
                let chair = minHeap.dequeue().element.chair;
                
                if(friend.person === targetFriend) return chair;
                
                chairsAssigned.set(friend.person, chair);
            }
        } else {
            let chair = chairsAssigned.get(friend.person);
            
            chairsAssigned.delete(friend.person);
            
            minHeap.enqueue({ chair: chair });
        }
    }
    
};