const Hapi  = require('hapi');

// create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8000,
});

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        return reply({ message: 'hello, world' });
    }
});

// Start the server
server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
});
