const knex = require("./Knex");

function Get(userId) {
    return knex('cuenta').where('idUsuario', userId);
};

function Create(nombre, saldo, IBAN, idUsuario) {
    return knex('cuenta').insert({"nombre" : nombre, "saldo" : saldo, "IBAN" : IBAN, "idUsuario" : idUsuario});
};

function GetFromIBAN(iban) {
    return knex('cuenta').where('IBAN', iban);
};

function Update(iban, amount) {
    return knex('cuenta').update({'saldo': knex.raw("(saldo + " + amount + ")")}).where('IBAN', iban);
};

module.exports = {
    Get,
    GetFromIBAN,
    Update,
    Create
};