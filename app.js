const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');   //database
//routes
//models
const app = express();


sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000,() => {
        console.log('Server is listening on PORT 3000')
    });
  })
  .catch(err => {
    console.log(err);
  });