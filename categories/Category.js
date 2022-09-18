const Sequelize = require("sequelize");
const connection = require("../database/database");

//Definindo o model:
const Category = connection.define('categories', {
    tittle:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{//endereço da categoria
        type: Sequelize.STRING,
        allowNull:false
    } 
})

Category.sync({force:true});

module.exports= Category;