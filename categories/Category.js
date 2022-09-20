const Sequelize = require("sequelize");
const connection = require("../database/database");

//Definindo o model:
const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{//endereço ou título da categoria
        type: Sequelize.STRING,
        allowNull:false
    } 
});

//Category.sync({force:true});

module.exports= Category;