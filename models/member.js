const Sequelize=require('sequelize')
const { Snowflake } = require('@theinternetfolks/snowflake');
const sequelize=require('../database')

const Member=sequelize.define('member', {
    id:{
        type: Sequelize.STRING,
        defaultValue: Snowflake.generate(),
        allowedNull: false,
        primaryKey: true
    },
})

module.exports=Member;