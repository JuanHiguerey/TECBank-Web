const express = require('express')
const app = express()
const mysql = require('mysql')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tecbank_db'
})

app.get('/', (req, res)=> {
    const sqlInsert = "INSERT INTO usuario (nombre, apellido, nombreUsuario, correo, password) VALUES ('Mauricio', 'Aguero', 'MauAguero', 'mau@gmail.com', '1234');"
    db.query(sqlInsert, (err, result) => {
        res.send("hello")
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
})