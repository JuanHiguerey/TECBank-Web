const knex = require("./Knex");

//agendar una cita
function ScheduleAppointment(idUsuario, dia, hora, idTipoCita, idSucursal){
    return knex('cita').insert({'dia': dia, 'hora': hora, 'idTipoCita': idTipoCita, 'idUsuario': idUsuario, 'idSucursal': idSucursal})
}

//modificar una cita
function ReScheduleAppointment(idUsuario, diaOriginal, horaOriginal, dia, hora, idSucursal){
    return knex('cita').update({'dia': dia, 'hora': hora}).where({'idUsuario': idUsuario, 'dia': diaOriginal, 'hora': horaOriginal, 'idSucursal': idSucursal})
}

//cancelar una cita
function CancelAppointment(dia, hora, idUsuario, idSucursal){
    return knex('cita').where({'dia': dia, 'hora': hora, 'idUsuario': idUsuario, 'idSucursal': idSucursal}).del()
}

//obtener una cita por dia y hora
function GetAppointment(dia, hora, idSucursal){
    return knex('cita').where({'dia': dia, 'hora': hora, 'idSucursal': idSucursal})
}

function GetAppointmentsDay(dia){
    return knex('cita').where({'dia': dia})
}

module.exports = {
    ScheduleAppointment,
    ReScheduleAppointment,
    CancelAppointment,
    GetAppointment,
    GetAppointmentsDay
};