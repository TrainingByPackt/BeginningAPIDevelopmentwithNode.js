const env = process.env.NODE_ENV || 'development';

const configs = {
  development: {
    client: 'mysql',
    connection: {
      host: 'sql2.freemysqlhosting.net',
      user: 'sql2207042',
      password: 'eN7%qU5!',
      database: 'sql2207042',
      charset: 'utf8',
    },
  }
};
const Knex = require('knex')(configs[env]);

module.exports = Knex;
