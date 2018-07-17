const Hapi = require('hapi');
const good = require('good');
const hapiAuthJwt = require('hapi-auth-jwt');

// routes
const routes = {};
routes.todo = require('./routes/todo');
routes.auth = require('./routes/auth');

// create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: process.env.PORT || 8000,
  routes: {
    cors: true,
  }
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply({ message: 'hello, world' });
  }
});

server.route(routes.auth);

// load other routes
server.register(hapiAuthJwt, (err) => {
  server.auth.strategy('token', 'jwt', {
    key: 'secretkey-hash',
    verifyOptions: {
      algorithms: [ 'HS256' ],
    },
  });

  // add auth config on all routes
  const authRoutes = routes.todo.map(route => {
    const authConfig = { strategy: 'token' };
    if (route.config) {
      route.config.auth = authConfig;
    } else {
      route.config = {
        auth: authConfig,
      };
    }
    return route;
  });
  server.route(authRoutes);
});

// set up logging
const options = {
  ops: {
    interval: 100000,
  },
  reporters: {
    consoleReporters: [
      { module: 'good-console' },
      'stdout',
    ],
  },
};

server.register({
  register: good,
  options,
}, (err) => {
  if (err) return console.error(err);

  // Start the server
  server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
  });
});

module.exports = server;
