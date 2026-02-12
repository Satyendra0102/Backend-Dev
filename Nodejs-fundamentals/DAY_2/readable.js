const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'input.txt');

const readstream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });

readstream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});
readstream.on('end', () => {
    console.log('No more data to read.');
});
readstream.on('error', (err) => {
    console.error('Error reading file:',err.message );
});
readstream.on('close', () => {
    console.log('Stream closed.');
});