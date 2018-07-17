const http = require('http');

const server = http.createServer((request, response) => {
  console.log('request starting...');

  // repond
  response.write('hello world!');
  response.end();
});

server.listen(5000);
 console.log('Server running at http://127.0.0.1:5000');
