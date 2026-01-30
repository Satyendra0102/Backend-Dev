const fs = require('fs');

fs.mkdir('myFolder', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Folder created');
});
