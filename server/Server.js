const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const user = require("./api/User");
const cita = require("./api/Citas");
const reportes = require("./api/ReportesSalida");
const account = require("./api/Account");
const transfer = require("./api/Transfer");
const tipoCambio=require("./tipoCambio");
const planAhorro=require("./api/PlanAhorro");
const token = require("./api/Token")

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////// Token de Seguridad /////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/token/send/:email", async (req, res) => {
    const transporter = nodemailer.createTransport({
        service:'outlook',
        auth: {
          user: 'tecwebcr@outlook.com' , // correo
          pass: 'password1<>', // password
        },
    });

    var mailOptions = {
        from: 'tecwebcr@outlook.com', // correo de envio
        to: req.params.email,//correo destino
        subject: 'Token de Seguridad', // Subject del correo
        text: token.Get().toString(), // generar token random y el contenido del correo.
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) {
            console.log(error);
            res.status(200).json({status: "error"});//regresa el token para verificar
        }
        else {
            res.status(200).json({status: "success", token: mailOptions.text });//regresa el token para verificar
        }
    }); 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////// Modulo de Inicio //////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/api/user/:username/:password", async (req, res) => {
    try {
        const rows = await user.Get(req.params.username, req.params.password);
        const rowsJson = JSON.parse(JSON.stringify(rows));
        const username = rowsJson[0].nombreUsuario;
        const id = rowsJson[0].idUsuario;
        const email = rowsJson[0].correo;
        console.log("User " + username + " has logged in.");
        res.status(200).json({"status": "success", "userId": id, "email": email});
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

app.post("/api/user/:name/:lastname/:email/:username/:password", async (req, res) => {
    try {
        const ids = await user.Create(req.params.name, req.params.lastname, req.params.email, req.params.username, req.params.password);
        let inicio = 1000000;
        let fin = 99999999;
        let aleatorio=inicio+Math.floor(Math.random()*fin);
        const acc = await account.Create("Corriente", 500000, "CR" + aleatorio, ids[0]);
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
        res.status(200).json({"status": "success", "accounts": rowsJson});
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

app.get("/api/transfer/:userId", async (req, res) => {
    try {
        const rows = await transfer.Get(req.params.userId);
        const rowsJson = JSON.parse(JSON.stringify(rows));
        res.status(200).json({"status": "success", "transfers": rowsJson});
    }
    catch (error) {
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

app.post("/api/transfer/:source/:target/:amount/:ssn/:bank/:detail/:userId", async (req, res) => {
    try {
        const acc = await account.GetFromIBAN(req.params.source);
        const accJson = JSON.parse(JSON.stringify(acc));
        const funds = accJson[0].saldo;
        if(funds < req.params.amount) {
            res.status(200).json({"status": "error"});
        }
        else {
            var transferType = 1;
            var commission = 0;
            if(req.params.bank != "NONE") {
                transferType = 2;
                const cambio = await tipoCambio.indicadoresEconomicosBCCR('tecbankcr@gmail.com', 'GM2TKNMO27');
                const dolar = cambio[0].Venta;
                commission = 2 * dolar;
                if(funds < req.params.amoun + commission) {
                    res.status(200).json({"status": "error"});
                }
            }
            const src = await account.Update(req.params.source, -req.params.amount - commission);
            const tar = await account.Update(req.params.target, req.params.amount);
            const ids = await transfer.Create(req.params.source, req.params.target, parseFloat(req.params.amount) + commission, req.params.ssn, req.params.bank, transferType, req.params.detail, req.params.userId);
            res.status(200).json({"status": "success", "transferId": ids[0]});
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

//obtener la venta y compra del dolar
app.get("/tipocambio", async (req, res) => {
    //'tecbankcr@gmail.com', 'GM2TKNMO27'
    try{
        const cambio = await tipoCambio.indicadoresEconomicosBCCR('tecbankcr@gmail.com', 'GM2TKNMO27');
        res.json(cambio);
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
});

//-----------------------------Plan de Ahorro---------------------------------------

//obtener la informacion del plan por el id del usuario
app.get("/PlanAhorro/:id", async (req, res) => {
    const {id} = req.params;
    const plan=await planAhorro.Get(id);
    res.json(plan);
});

//agregar un nuevo sobre de ahorro
app.post("/PlanAhorro", async (req, res) => {
    try{
        const results = await planAhorro.Create(req.body);
        res.status(200).json({id: results[0]});
    }
    catch(error){
        console.error(error);
        res.status(200).json({"status": "error"});
    }
    
});


app.listen(1337, () => console.log("server is running on port 1337"));