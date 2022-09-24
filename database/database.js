const Sequelize = require ("sequelize");

//Criar objeto de conexão:
const connection = new Sequelize('guiapress', 'root','1169',{
    host:'localhost',
    dialect:'mysql',
    timezone:"-03:00"
});

module.exports=connection;
