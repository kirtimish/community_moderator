const Sequelize=require('sequelize')
const sequelize=require('../database')

const User=sequelize.define('users', {
    id:{
        type: Sequelize.STRING,
        allowNull:false,
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