const fs = require('fs');
const { Writable } = require('stream');

// Create a writable stream
const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log('Writing:', chunk.toString());
    callback();
  }
});

// Example usage
writableStream.write('Hello, ');
writableStream.write('World!');
writableStream.end();