const knex = require("./Knex");

//crear reporte
function newReport(idUsuario, nombre, cedula, telefono, correo, destino, diaSalida, diaRegreso){
    return knex('salida_pais').insert({'nombre': nombre, 'cedula': cedula, 'telefono': telefono, 'correo': correo, 'destino': destino, 'diaSalida': diaSalida, 'diaRegreso': diaRegreso, 'idUsuario': idUsuario})
}

module.exports = {
    newReport
}