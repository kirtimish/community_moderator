const Sequelize = require('sequelize');
const { Generator } = require('snowflake-generator');
const sequelize=require('../database');

const Community=sequelize.define('community',{
    id:{
        type: Sequelize.STRING,
        default: new Generator(),
        allowedNull: false,
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