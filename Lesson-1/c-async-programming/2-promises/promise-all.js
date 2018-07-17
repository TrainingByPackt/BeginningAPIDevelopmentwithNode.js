const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const files = [
  'temp/sample.txt',
  'temp/sample1.txt',
  'temp/sample2.txt',
];

// map the files to the readFile function, creating an
// array of promises
const promises = files
  .map(file => readFile(`${__dirname}/../${file}`, 'utf8'));

Promise.all(promises)
  .then(data => {
    data.forEach(text => console.log(text));
  })
  .catch(error => console.log('err: ', error));
