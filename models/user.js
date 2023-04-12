const Sequelize=require('sequelize')
const { Generator } = require('snowflake-generator');
const sequelize=require('../database')

const User=sequelize.define('users', {
    id:{
        type: Sequelize.STRING,
        default: new Generator(),
        allowedNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        default: null
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
        allowedNull: false
    },
    password:{
        type:Sequelize.STRING,
        allowedNull:false
    }
})

module.exports=User;