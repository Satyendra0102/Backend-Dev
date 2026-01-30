📘 Node.js File System Operations – Assignment
👨‍💻 Student: Harsh Chimnani
📚 Topic: File System Module (fs) in Node.js
✅ Assessment Question Answers
1. Difference between synchronous and asynchronous file operations
Synchronous	Asynchronous
Blocks program execution	Non-blocking
Slower for large tasks	Faster & efficient
Uses Sync methods	Uses callbacks/promises
Example: fs.readFileSync()	Example: fs.readFile()

👉 Asynchronous methods are preferred in real-world applications.

2. When should you use file streams instead of reading the entire file?

File streams should be used when working with large files because:

Data is processed in small chunks

Uses less memory

Prevents application crashes

Examples: Large logs, videos, big CSV files.

3. Purpose of the 'utf8' encoding parameter

The 'utf8' encoding tells Node.js to read the file as text.

Without 'utf8' → Output is a Buffer (binary data)
With 'utf8' → Output is a readable string

4. Common error codes in file system operations
Error Code	Meaning
ENOENT	File or directory not found
EACCES	Permission denied
EEXIST	File already exists
EISDIR	Expected file but found directory
ENOTDIR	Expected directory but found file
5. How to safely delete a directory with all its contents
const fs = require('fs');

fs.rm('myFolder', { recursive: true, force: true }, (err) => {
  if (err) console.error(err);
  else console.log('Folder deleted successfully');
});

6. Explain piping in streams with an example

Piping transfers data from a readable stream to a writable stream.

const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);


Used for copying files, streaming media, etc.

7. Why is error handling important in file operations?

Because files might:

Not exist

Have permission restrictions

Be corrupted

Error handling prevents application crashes and improves reliability.

8. Difference between writeFile and appendFile
writeFile	appendFile
Overwrites existing content	Adds content to end of file
Used for fresh writing	Used for logs or updates
Creates file if not exists	Also creates if not exists
💻 Practical Programs
📄 Read a File
const fs = require('fs');
fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

📄 Write to a File
const fs = require('fs');
fs.writeFile('output.txt', 'Hello from Node.js', (err) => {
  if (err) console.error(err);
});

📄 Append to a File
const fs = require('fs');
fs.appendFile('output.txt', '\nNew Line', (err) => {
  if (err) console.error(err);
});

📄 Copy a File
const fs = require('fs');
fs.copyFile('sample.txt', 'copy.txt', (err) => {
  if (err) console.error(err);
});

📄 Delete a File
const fs = require('fs');
fs.unlink('copy.txt', (err) => {
  if (err) console.error(err);
});

📄 Create Directory
const fs = require('fs');
fs.mkdir('myFolder', { recursive: true }, (err) => {
  if (err) console.error(err);
});

📄 Read Directory
const fs = require('fs');
fs.readdir('.', (err, files) => {
  if (err) console.error(err);
  console.log(files);
});

📄 Copy Using Streams
const fs = require('fs');

const readStream = fs.createReadStream('sample.txt');
const writeStream = fs.createWriteStream('streamCopy.txt');

readStream.pipe(writeStream);