const knex = require("./Knex");

function Get(userId) {
    return knex('transferencia').where('idUsuario', userId);
};

function Create(source, target, amount, ssn, bank, type, detail, userId) {
    return knex('transferencia').insert({'cuentaOrigen': source, 'cuentaDestino': target, 'monto': amount, 'fecha':  knex.raw('CURRENT_TIMESTAMP'), 'cedula': ssn, 'banco': bank, 'idTipoMovimiento': type, 'detalle': detail,
    'idUsuario': userId});
}

module.exports = {
    Get,
    Create
};