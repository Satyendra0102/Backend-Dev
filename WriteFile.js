const fs = require('fs');

fs.writeFile('output.txt', 'This file was created using Node.js', (err) => {
  if (err) {
    console.error('Error writing file:', err.message);
    return;
  }
  console.log('File written successfully');
});
