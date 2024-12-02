const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

function findAndDeleteNodeModules(startPath, minDepth, currentDepth = 0) {
    if (!fs.existsSync(startPath)) return;

    if (currentDepth >= minDepth) {
        const files = fs.readdirSync(startPath);
        files.forEach((file) => {
            const curPath = path.join(startPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                if (file === 'node_modules') {
                    console.log('Deleting:', curPath);
                    deleteFolderRecursive(curPath);
                } else {
                    findAndDeleteNodeModules(curPath, minDepth, currentDepth + 1);
                }
            }
        });
    } else {
        const files = fs.readdirSync(startPath);
        files.forEach((file) => {
            const curPath = path.join(startPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                findAndDeleteNodeModules(curPath, minDepth, currentDepth + 1);
            }
        });
    }
}

const targetDirectory = './'; // Replace with your root folder path
const minDepth = 8; // Minimum depth to start deleting
findAndDeleteNodeModules(targetDirectory, minDepth);
