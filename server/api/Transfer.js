const knex = require("./Knex");

function Get(iban) {
    return knex('transferencia').where('cuentaOrigen', iban);
};

function Create(source, target, amount, ssn, bank, type) {
    return knex('transferencia').insert({'cuentaOrigen': source, 'cuentaDestino': target, 'monto': amount, 'fecha':  knex.raw('CURRENT_TIMESTAMP'), 'cedula': ssn, 'banco': bank, 'idTipoMovimiento': type});
}

module.exports = {
    Get,
    Create
};