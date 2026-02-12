const fs = require('fs');
const path = require('path');

// Function to copy a file
function copyFile(source, destination) {
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error('Error copying file:', err);
    } else {
      console.log('File copied successfully');
    }
  });
}

// Function to delete a file
function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully');
    }
  });
}

// Example usage
const sourceFile = path.join(__dirname, 'input.txt');
const destinationFile = path.join(__dirname, 'input_copy.txt');

// Copy the file
copyFile(sourceFile, destinationFile);


// Delete the original file after copying (optional)
// setTimeout(() => deleteFile(sourceFile), 1000);