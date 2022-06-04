const knex = require("./Knex");

function Get(userId) {
    return knex('cuenta').where('idUsuario', userId);
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
    Update
};