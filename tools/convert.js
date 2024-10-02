const fs = require('fs');
const path = require('path');

// Function to convert Markdown to LinkedIn-style text
function convertMarkdownToLinkedIn(markdown) {
    // Replace Markdown headers with LinkedIn-style headers
    let linkedinText = markdown
        .replace(/^# (.*$)/gim, '$1\n' + '='.repeat(50)) // H1
        .replace(/^## (.*$)/gim, '$1\n' + '-'.repeat(50)) // H2
        .replace(/^### (.*$)/gim, '**$1**') // H3
        .replace(/\*\*(.*)\*\*/gim, '*$1*') // Bold to Italics
        .replace(/\*(.*)\*/gim, '_$1_') // Italics to Underline
        .replace(/!\[(.*?)\]\((.*?)\)/gim, '') // Remove images
        .replace(/\[(.*?)\]\((.*?)\)/gim, '$1'); // Remove links

    return linkedinText.trim();
}

// Read the input Markdown file
const inputFilePath = path.join(__dirname, 'input.md');
const outputFilePath = path.join(__dirname, 'output.ld');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }

    // Convert the Markdown content to LinkedIn-style text
    const linkedinText = convertMarkdownToLinkedIn(data);

    // Write the converted text to the output file
    fs.writeFile(outputFilePath, linkedinText, 'utf8', (err) => {
        if (err) {
            console.error('Error writing output file:', err);
            return;
        }

        console.log('Conversion complete! Check output.ld for the result.');
    });
});
