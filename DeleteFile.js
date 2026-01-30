const fs = require('fs');

fs.unlink('copy.txt', (err) => {
  if (err) throw err;
  console.log('File deleted');
});
