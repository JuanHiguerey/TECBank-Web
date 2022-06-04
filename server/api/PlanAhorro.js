const knex = require("./Knex");

function Get(idUsuario) {
    return knex("plan_ahorro").select("nombre", "montoFinal", "fecha").where("idUsuario", idUsuario);
};


//crear un Plan de ahorro
function Create(PlanAhorro) {
    return knex("plan_ahorro").insert(PlanAhorro);
};

module.exports = {
    Get,
    Create
};