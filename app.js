const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');   //database
//routes
//models
const User = require('./models/user')
const Community = require('./models/community')
const Member = require('./models/member')
const Role = require('./models/role')

const app = express();

//associations
Community.belongsToMany(User,{through: Member})
User.belongsToMany(Community,{through: Member})

Role.hasMany(Member)
Member.belongsTo(Role)

sequelize
  .sync({force: true})
  .then(result => {
    // console.log(result);
    app.listen(3000,() => {
        console.log('Server is listening on PORT 3000')
    });
  })
  .catch(err => {
    console.log(err);
  });