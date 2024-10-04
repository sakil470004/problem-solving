// 2491. Divide Players Into Teams of Equal Skill
// You are given a positive integer array skill of even length n where skill[i] denotes the skill of the ith player. Divide the players into n / 2 teams of size 2 such that the total skill of each team is equal.

// The chemistry of a team is equal to the product of the skills of the players on that team.

// Return the sum of the chemistry of all the teams, or return -1 if there is no way to divide the players into teams such that the total skill of each team is equal.



// Example 1:

// Input: skill = [3,2,5,1,3,4]
// Output: 22
// Explanation: 
// Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
// The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.
// Example 2:

// Input: skill = [3,4]
// Output: 12
// Explanation: 
// The two players form a team with a total skill of 7.
// The chemistry of the team is 3 * 4 = 12.
// Example 3:

// Input: skill = [1,1,2,3]
// Output: -1
// Explanation: 
// There is no way to divide the players into teams such that the total skill of each team is equal.

var dividePlayers = function (skill) {
    if (skill.length % 2 !== 0) return -1;  // Odd number of players can't be divided into teams
    if (skill.length === 2) return skill[0] * skill[1];  // If only two players, return product of their skill

    let totalSkill = skill.reduce((a, b) => a + b);  // Calculate total skill
    let target = totalSkill / (skill.length / 2);  // Target sum for each pair of players
    
    // Sort the skills array
    skill.sort((a, b) => a - b);
    
    const result = [];
    let left = 0;
    let right = skill.length - 1;
    
    while (left < right) {
        if (skill[left] + skill[right] !== target) {
            return -1;  // If a pair doesn't add up to the target, return -1
        }
        
        result.push(skill[left] * skill[right]);  // Store the product of paired skills
        left++;
        right--;
    }

    return result.reduce((a, b) => a + b, 0);  // Return the sum of the products of all pairs
};

//mynul code . run but time limit exceed
var dividePlayers2 = function (skill) {
    if (skill.length % 2 !== 0) return -1;
    if (skill.length === 2) return skill[0] * skill[1];
    let totalSkill = skill.reduce((a, b) => a + b);
    let target = totalSkill / (skill.length / 2);

    const result = [];
    const visited = new Array(skill.length).fill(false);
    for (let i = 0; i < skill.length; i++) {
        if (visited[i]) continue;
        for (let j = i + 1; j < skill.length; j++) {
            if (visited[j]) continue;
            if (skill[i] + skill[j] === target && !visited[i] && !visited[j]) {
                result.push(skill[i] * skill[j]);
                visited[i] = true;
                visited[j] = true;
               
            }
        }
    }
    // console.log("i am target",result)
    
    return result.length === skill.length / 2 ? result.reduce((a, b) => a + b) : -1;
};
console.log(dividePlayers([2,3,4,2,5,5])); // 32