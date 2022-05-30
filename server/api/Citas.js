const knex = require("./Knex");

//agendar una cita
function ScheduleAppointment(idUsuario, dia, hora, idTipoCita){
    return knex('cita').insert({'dia': dia, 'hora': hora, 'idTipoCita': idTipoCita, 'idUsuario': idUsuario})
}

//modificar una cita
function ReScheduleAppointment(idUsuario, diaOriginal, horaOriginal, dia, hora){
    return knex('cita').update({'dia': dia, 'hora': hora}).where({'idUsuario': idUsuario, 'dia': diaOriginal, 'hora': horaOriginal})
}

//cancelar una cita
function CancelAppointment(dia, hora, idUsuario){
    return knex('cita').where({'dia': dia, 'hora': hora, 'idUsuario': idUsuario}).del()
}

//obtener una cita por dia y hora
function GetAppointment(dia, hora){
    return knex('cita').where({'dia': dia, 'hora': hora})
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