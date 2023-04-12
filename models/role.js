const Sequelize=require('sequelize')
const { Generator } = require('snowflake-generator');
const sequelize=require('../database')

const Role=sequelize.define('role', {
    id:{
        type: Sequelize.STRING,
        default: new Generator(),
        allowedNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        unique: true,
        default: null
    }
})

module.exports=Role;