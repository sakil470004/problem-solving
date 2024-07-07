var lengthOfLastWord = function(s) {
//   trim() method removes whitespace from both ends of a string.
    const words = s.trim().split(" ");
    return words[words.length - 1].length;
};
const result = lengthOfLastWord("   fly me   to   the moon  ");
console.log(result); 