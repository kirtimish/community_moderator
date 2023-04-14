const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');   //database
//routes
const userRoutes = require('./routes/user')
const communityRoutes = require('./routes/community')
const roleRoutes = require('./routes/role')
const memberRoutes = require('./routes/member')
//models
const User = require('./models/user')
const Community = require('./models/community')
const Member = require('./models/member')
const Role = require('./models/role')

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/v1/auth',userRoutes)
app.use('/v1/community',communityRoutes)
app.use('/v1/member',memberRoutes)
app.use('/v1/role',roleRoutes)

//associations
User.hasMany(Community, {foreignKey: 'owner'});
Community.belongsTo(User, {
  foreignKey: 'owner'
});

Community.belongsToMany(User, { through: Member})
User.belongsToMany(Community,{through: Member})

Role.hasMany(Member)
Member.belongsTo(Role)

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