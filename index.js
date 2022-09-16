const express = require("express");
const app = express();

//View engine:
app.set('view engine','ejs');

//Rota:
app.get("/", (req, res) => {
    res.render("index");
})

//Servidor:
app.listen(8080, ()=>{
    console.log("Servidor está rodando!");
})