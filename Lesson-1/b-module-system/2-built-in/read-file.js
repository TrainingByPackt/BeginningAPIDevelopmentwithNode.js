const fs = require('fs');

let file = `${__dirname}/temp/sample.txt`;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
