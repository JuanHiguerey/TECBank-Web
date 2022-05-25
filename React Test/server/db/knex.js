const knex = require("knex");

const connectedKnex = knex({
    client: 'mysql',
    connection: {
    host : 'localhost',
    user : 'root',
    password : '123456789',
    database : 'tecbank_db'
  }
});

module.exports = connectedKnex;
