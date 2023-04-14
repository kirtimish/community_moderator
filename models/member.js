const Sequelize=require('sequelize')

const sequelize=require('../database')

const Member=sequelize.define('member', {
    id:{
        type: Sequelize.STRING,
        allowedNull: false,
        primaryKey: true
    },
})

module.exports=Member;