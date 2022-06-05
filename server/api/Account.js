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

function Max(userId){
    const monto=  knex('cuenta').select('iban').max('saldo as fondo').where('idUsuario', userId);
    return monto; 
}

module.exports = {
    Get,
    GetFromIBAN,
    Update,
<<<<<<< HEAD
    Create
=======
    Max
>>>>>>> 85b23bf5ce74c580c3d47dabd5a3052c768560f7
};