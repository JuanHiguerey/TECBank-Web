const knex = require("./Knex");

function Get(username, password) {
    return knex('usuario').where('nombreUsuario', username).where('password', password);
};

function Create(name, lastname, username, email, password) {
    return knex('usuario').insert({'nombre': name, 'apellido': lastname, 'correo': email, 'nombreUsuario': username, 'password': password});
}

module.exports = {
    Get,
    Create
};