const fs = require('fs');
const util = require('util');

const _ = require('lodash');


async function transformFile(inFile, outFile) {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  console.log(`reading file: ${inFile}`);
  const data = await readFile(`${__dirname}/${inFile}`, 'utf8');
  let names = data.split('\n');
  
  // transform each
  names = names.map(_.startCase).sort();
  console.log(`writing file: ${outFile}`);
  // write out
  await writeFile(`${__dirname}/${outFile}`, names.join('\n'));
  console.log('done!');
  return;
}

transformFile('in-file.txt', 'out-file.txt');
