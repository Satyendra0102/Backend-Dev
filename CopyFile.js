const fs = require('fs');

fs.copyFile('sample.txt', 'copy.txt', (err) => {
  if (err) throw err;
  console.log('File copied');
});
