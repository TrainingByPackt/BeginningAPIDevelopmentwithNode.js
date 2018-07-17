const env = process.env.NODE_ENV || 'development';

const configs = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'todo',
      charset: 'utf8',
    },
  }
};
const Knex = require('knex')(configs[env]);

module.exports = Knex;
