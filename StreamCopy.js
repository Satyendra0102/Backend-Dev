const fs = require('fs');

const readStream = fs.createReadStream('sample.txt');
const writeStream = fs.createWriteStream('streamCopy.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File copied using streams');
});
