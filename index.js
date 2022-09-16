const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//View engine:
app.set('view engine','ejs');

//Arquivos static:
app.use(express.static('public'));
//Body-parser (para aceitar dados de formulários):
app.use(bodyParser.urlencoded({extends:false}));
//aceitar também dados formato json:
app.use(bodyParser.json());

//Rota:
app.get("/", (req, res) => {
    res.render("index");
})

//Servidor:
app.listen(8080, ()=>{
    console.log("Servidor está rodando!");
})