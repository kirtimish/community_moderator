const User = require('../models/user')
const { Snowflake } = require('@theinternetfolks/snowflake');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function generateToken(id){
    return jwt.sign({ userId: id}, 'commodappvone')
}

exports.signup = async(req,res,next) => {
    const { name, email,password } = req.body
    const id = Snowflake.generate();
    
    if(!name || !email || !password){
        res.status(403).json({ success:false, message:'values are missing' })
    }
    try {
        const user = await User.findAll({where:{email}})

        if(user.length > 0){
            res.status(207).json({ success: false, message:'user already exists' })
        } else {
            bcrypt.hash(password,10, async(err,hash) => {
                if(!err){
                    const data = await User.create({ id, name, email, password:hash })
                    res.status(201).json({ data, success:true, message: 'signup successfull'})
                }
            })
        }

    } catch (err) {
        res.status(500).json({ success:false, message: 'something went wrong!'})
    }
}

exports.signin = async(req,res,next) => {
    const { email,password } = req.body
    if(!email || !password){
        res.status(403).json({ success:false, message:'values are missing' })
    }
    try {
        const user = await User.findAll({where:{email}})

        if(user.length > 0){
            bcrypt.compare(password,user[0].password, async(err,match) => {
                if(!match){
                    return res.status(203).json({ success:false, message: 'user is unauthorised'})
                } 
                return res.status(201).json({ success: true, message:'logged in successfully', meta: generateToken(user[0].id)})
            })
        } else {
            return res.status(203).json({ success: false, message:'User email is unvalid'})
        }

    } catch (err) {
        res.status(500).json({ success:false, message: 'something went wrong!'})
    }
}

exports.decodeToken = async(req,res,next) => {
    try {
        const { token } = req.body;
        const decoded = jwt.decode(token)
        const userDetails = await User.findAll({where:{id: decoded.userId}})
        // console.log(userDetails)
        res.status(200).json({ success:true, userDetails})
    } catch (err) {
        res.status(500).json({ success:false, message: 'something went wrong!'})
    }
}