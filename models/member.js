const Sequelize=require('sequelize')
const { Generator } = require('snowflake-generator');
const sequelize=require('../database')

const Member=sequelize.define('member', {
    id:{
        type: Sequelize.STRING,
        default: new Generator(),
        allowedNull: false,
        primaryKey: true
    },
})

module.exports=Member;