const Sequelize = require('sequelize');
const { Snowflake } = require('@theinternetfolks/snowflake');
const sequelize=require('../database');

const Community=sequelize.define('community',{
    id:{
        type: Sequelize.STRING,
        defaultValue: Snowflake.generate(),
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
    },
    owner:{
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: 'Id',
          },
        allowedNull: false,
    }
});

module.exports=Community;