const knex = require("./Knex");

function Get(username, password) {
    return knex('usuario').where('nombreUsuario', username).where('password', password);
};


function Create(name, lastname, email, username, password) {
    return knex('usuario').insert({'nombre': name, 'apellido': lastname, 'correo': email, 'nombreUsuario': username, 'password': password});
}

function Update(idUsuario, password){
    return knex('usuario').update('password',password).where('idUsuario', idUsuario)
}

module.exports = {
    Get,
    Create,
    Update
};