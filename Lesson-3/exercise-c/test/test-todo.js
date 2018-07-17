const assert = require('assert');
// lab set-up
const Lab = require('lab');
const lab = exports.lab = Lab.script();
// get our server(API)
const server = require('../server');

const {
  experiment,
  test,
  before,
} = lab;

experiment('Base API', () => {
  test('GET: /', () => {
    const options = {
      method: 'GET',
      url: '/',
    };
    server.inject(options, (response) => {
      assert.equal(response.statusCode, 200);
      assert.equal(response.result.message, 'hello, world');
    });
  });
});

experiment('Authentication', () => {
  test('GET: /todo without auth', () => {
    const options = {
      method: 'GET',
      url: '/todo'
    };
    server.inject(options, (response) => {
      assert.equal(response.statusCode, 401);
    });
  });
});

experiment('/todo/* routes', () => {
  const headers = {
    Authorization: 'Bearer ',
  };
  before(() => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        email: 'another@example.com',
        password: '12345',
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        headers.Authorization += response.result.token;
        done();
      });
    });
  });

  test('GET: /todo', () => {
    const options = {
      method: 'GET',
      url: '/todo',
      headers: headers,
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(Array.isArray(response.result), true);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
});