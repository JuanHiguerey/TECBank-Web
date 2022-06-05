const knex = require("./Knex");

function Get(idUsuario) {
    return knex("plan_ahorro").select("nombre", "montoFinal", "fecha").where("idUsuario", idUsuario);
};


//crear un Plan de ahorro
function Create(idUsuario, nombre ,idTipoPlan, plazo, montoFinal) {
    return knex("plan_ahorro").insert({'idUsuario':idUsuario, 'nombre':nombre,'idTipoPlan':idTipoPlan, 'plazo':plazo,'montoFinal':montoFinal});
};

module.exports = {
    Get,
    Create
};