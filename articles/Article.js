const Sequelize = require("sequelize");
const connection = require("../database");

//Definindo o model:
const Article = connection.define('articles', {
    tittle:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{//endereço da categoria
        type: Sequelize.STRING,
        allowNull:false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports= Article;