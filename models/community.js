const Sequelize = require('sequelize');
const sequelize=require('../database');

const Community=sequelize.define('community',{
    id:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowedNull: false
    },
    slug:{
        type:Sequelize.STRING,
        allowedNull: false,
        unique:true
    }
});

module.exports=Community;