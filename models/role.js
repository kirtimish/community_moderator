const Sequelize=require('sequelize')
const sequelize=require('../database')

const Role=sequelize.define('role', {
    id:{
        type: Sequelize.STRING,
        allowedNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        unique: true,
        defaultValue: null
    }
})

module.exports=Role;