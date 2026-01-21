const fs = require("fs");
const path = require("path");

// File paths
const inputFile = path.join(__dirname, "input.txt");
const outputFile = path.join(__dirname, "output.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }

  const words = data.trim().split(/\s+/);
  const wordCount = data.trim() === "" ? 0 : words.length;

  const outputText = `Word counts: ${wordCount}`;

  fs.writeFile(outputFile, outputText, "utf8", (err) => {
    if (err) {
      console.error("Error writing output file:", err);
      return;
    }
    console.log("Word count written to output.txt");
  });
});
