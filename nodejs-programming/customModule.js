// exercise2.js

const stringUtils = require("./stringUtils");

const text = "hello world";

console.log("Original:", text);
console.log("Capitalized:", stringUtils.capitalize(text));
console.log("Reversed:", stringUtils.reverse(text));
console.log("Vowel count:", stringUtils.countVowels(text));
