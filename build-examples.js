const path = require('path');
const fs = require('fs');

const exampleSrcPath = path.join(__dirname, './json-src/');
const examplesOutputPath = path.join(__dirname, './public/json');
const example = require(`${exampleSrcPath}/example.js`);

example.id = 0;

const stringifiedExamples = JSON.stringify({ example });

fs.writeFileSync(`${examplesOutputPath}/example.json`, stringifiedExamples);
