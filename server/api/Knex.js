const knex = require("knex");

const connectedKnex = knex({
    client: 'mysql',
    connection: {
    host : 'localhost',
    user : 'root',
    password : 'mysql',
    database : 'tecbank_db'
  }
});

module.exports = connectedKnex;
