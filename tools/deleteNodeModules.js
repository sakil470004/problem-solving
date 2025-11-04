const fs = require('fs');
const path = require('path');

// Safety: set to true to do a dry run (only log what would be deleted).
// Set to false to actually remove files/directories.
const DRY_RUN = true;

// Names of folders we want to remove when found at/after minDepth
const targetNames = ['node_modules', '.next', 'dist'];

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                if (DRY_RUN) {
                    console.log('Would delete file:', curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }
        });
        if (DRY_RUN) {
            console.log('Would remove directory:', folderPath);
        } else {
            fs.rmdirSync(folderPath);
        }
    }
}

function findAndDeleteNodeModules(startPath, minDepth, currentDepth = 0) {
    if (!fs.existsSync(startPath)) return;

    const files = fs.readdirSync(startPath);
    files.forEach((file) => {
        const curPath = path.join(startPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
            if (currentDepth >= minDepth && targetNames.includes(file)) {
                console.log((DRY_RUN ? 'Would delete:' : 'Deleting:'), curPath);
                deleteFolderRecursive(curPath);
            } else {
                findAndDeleteNodeModules(curPath, minDepth, currentDepth + 1);
            }
        }
    });
}

const targetDirectory = './'; // Replace with your root folder path
const minDepth = 0; // Minimum depth to start deleting (0 = all levels)
findAndDeleteNodeModules(targetDirectory, minDepth);
