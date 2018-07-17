const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

readFile(`${__dirname}/../temp/sample.txt`, 'utf8')
  .then(data => console.log(data))
  .catch(error => console.log('err: ', error));
