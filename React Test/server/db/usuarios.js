const knex = require("./knex");


function getAllUsuarios() {
    return knex("Usuario").select("*");
};

/*function insertUsuario(usuario) {
    return knex("Usuarios").insert(usuario);
};

function updateUsuario(username, usuario) {
    return knex("Usuarios").where("NombreUsuario", username).update(usuario);
};

function deleteUsuario(username) {
    return knex("Usuarios").where("NombreUsuario", username).del();
};*/

module.exports = {
    getAllUsuarios
};

