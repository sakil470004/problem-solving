function rotateAlphabet(str, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const isLetter = alphabet.includes(char.toLowerCase());
      if (isLetter) {
        let index = alphabet.indexOf(char.toLowerCase());
        let newIndex = (index + shift) % 26;
        if (newIndex < 0) newIndex += 26; // For negative shifts
        const newChar = alphabet[newIndex];
        result += char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
      } else {
        result += char;
      }
    }
  
    return result;
  }
  
  // Usage:
  const originalText = 'Hello World!';
  const shiftedText = rotateAlphabet(originalText, 3); // Shifts each letter by 3 places
  console.log(shiftedText); // Outputs: Khoor Zruog!
  