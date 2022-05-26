const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require("./usuarios");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/usuarios", async (req, res) => {
    const usuarios = await db.getAllUsuarios();
    res.status(200).json({usuarios});
});

app.listen(1337, () => console.log("server is running on port 1337"));