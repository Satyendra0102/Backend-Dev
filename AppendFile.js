const fs = require('fs');

fs.appendFile('output.txt', '\nNew line added!', (err) => {
  if (err) throw err;
  console.log('Data appended');
});
