function isValid(s) {
    let frequency = {};
    for (let char of s) {
        if (frequency[char]) {
            frequency[char]++;
        } else {
            frequency[char] = 1;
        }
    }

    let frequencyArray = Object.values(frequency);
    let freqCount = {};

    for (let freq of frequencyArray) {
        if (freqCount[freq]) {
            freqCount[freq]++;
        } else {
            freqCount[freq] = 1;
        }
    }
console.log(freqCount)
    let uniqueFrequencies = Object.keys(freqCount);

    if (uniqueFrequencies.length === 1) {
        return "YES";  // All characters have the same frequency
    }

    if (uniqueFrequencies.length === 2) {
        let freq1 = parseInt(uniqueFrequencies[0]);
        let freq2 = parseInt(uniqueFrequencies[1]);
        
        if (
            (freqCount[freq1] === 1 && (freq1 - 1 === freq2 || freq1 - 1 === 0)) ||
            (freqCount[freq2] === 1 && (freq2 - 1 === freq1 || freq2 - 1 === 0))
        ) {
            return "YES";
        }
    }

    return "NO";
}
const result = isValid("aabbcd");
console.log(result);
