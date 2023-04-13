const Sequelize=require('sequelize')
const { Snowflake } = require('@theinternetfolks/snowflake');
const sequelize=require('../database')

const Role=sequelize.define('role', {
    id:{
        type: Sequelize.STRING,
        defaultValue: Snowflake.generate(),
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