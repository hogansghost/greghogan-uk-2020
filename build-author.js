const path = require('path');
const fs = require('fs');

const authorSrcPath = path.join(__dirname, './json-src/');
const authorsOutputPath = path.join(__dirname, './public/json');
const author = require(`${authorSrcPath}/author.js`);

author.id = 0;

const stringifiedAuthors = JSON.stringify({
  author,
});

fs.writeFileSync(`${authorsOutputPath}/author.json`, stringifiedAuthors);
