const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const user = require("./api/User");
const cita = require("./api/Citas");
const reportes = require("./api/ReportesSalida");
const account = require("./api/Account");
const transfer = require("./api/Transfer");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////// Modulo de Inicio //////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/api/user/:username/:password", async (req, res) => {
    try {
        const rows = await user.Get(req.params.username, req.params.password);
        const rowsJson = JSON.parse(JSON.stringify(rows));
        const username = rowsJson[0].nombreUsuario;
        const id = rowsJson[0].idUsuario;
        console.log("User " + username + " has logged in.");
        res.status(200).json({"status": "success", "userId": id});
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

app.post("/api/user/:name/:lastname/:email/:username/:password", async (req, res) => {
    try {
        const ids = await user.Create(req.params.name, req.params.lastname, req.params.email, req.params.username, req.params.password);
        console.log("User " + req.params.username + " has been registered.");
        res.status(200).json({"status": "success", "userId": ids[0]});
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////// Modulo Principal //////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/api/account/:userId", async (req, res) => {
    try {
        const rows = await account.Get(req.params.userId);
        const rowsJson = JSON.parse(JSON.stringify(rows));
        console.log(rowsJson);
        res.status(200).json({"status": "success", "accounts": rowsJson});
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

app.post("/api/transfer/:source/:target/:amount/:ssn/:bank/", async (req, res) => {
    try {
        const acc = await account.GetFromIBAN(req.params.source);
        const accJson = JSON.parse(JSON.stringify(acc));
        const funds = accJson[0].saldo;
        if(funds < req.params.amount) {
            res.status(200).json({"status": "error"});
        }
        else {
            var transferType = 1;
            if(req.params.bank != "NONE") {
                transferType = 2;
            }
            const src = await account.Update(req.params.source, -req.params.amount);
            const tar = await account.Update(req.params.target, req.params.amount);
            const ids = await transfer.Create(req.params.source, req.params.target, req.params.amount, req.params.ssn, req.params.bank, transferType);
            res.status(200).json({"status": "success", "userId": ids[0]});
        }
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////// Modulo Informativo /////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/getCita/:dia/:hora/:sucursal", async (req, res) =>{
    try{
        const appointment = await cita.GetAppointment(req.params.dia, req.params.hora, req.params.sucursal);
        const appointmentJson = JSON.parse(JSON.stringify(appointment));
        res.status(200).json({"status": "success", "json": appointmentJson})
    }
    catch (error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

app.post("/api/agendarCita/:id/:dia/:hora/:tipo/:sucursal", async (req, res) => {
    try{
        const appointment = await cita.ScheduleAppointment(req.params.id, req.params.dia, req.params.hora, req.params.tipo, req.params.sucursal)
        res.status(200).json({"status": "success"});
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
})

app.get("/api/getCitaU/:id/:dia/:hora/:sucursal", async (req, res) => {
    try{
        const appointment = await cita.GetUserAppointment(req.params.id, req.params.dia, req.params.hora, req.params.sucursal)
        const appointmentJson = JSON.parse(JSON.stringify(appointment))
        res.status(200).json({"status": "success", "json": appointmentJson});
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
})

app.post("/api/modificarCita/:id/:dia/:hora/:nDia/:nHora/:sucursal", async (req, res) => {
    try{
        await cita.ReScheduleAppointment(req.params.id, req.params.dia, req.params.hora, req.params.nDia, req.params.nHora, req.params.sucursal)
        res.status(200).json({"status": "success"});
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
})

app.post("/api/cancelarCita/:id/:dia/:hora/:sucursal", async (req, res) => {
    try{
        await cita.CancelAppointment(req.params.id, req.params.dia, req.params.hora, req.params.sucursal)
        res.status(200).json({"status": "success"});
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
})

app.post("/api/reporteSalida/:id/:nombre/:cedula/:telefono/:correo/:destino/:salida/:regreso", async (req, res) =>{
    try{
        await reportes.newReport(req.params.id, req.params.nombre, req.params.cedula, req.params.telefono, req.params.correo, req.params.destino, req.params.salida, req.params.regreso)
        res.status(200).json({"status": "success"});
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
})















app.listen(1337, () => console.log("server is running on port 1337"));