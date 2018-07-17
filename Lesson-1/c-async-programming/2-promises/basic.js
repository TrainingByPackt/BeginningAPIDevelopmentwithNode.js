const fs = require('fs');

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// call the async function
readFile(`${__dirname}/../temp/sample.txt`)
  .then(data => console.log(data))
  .catch(error => console.log('err: ', error.message));
