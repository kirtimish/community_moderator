const Role = require('../models/role')

exports.createRole = async(req,res,next) => {
    try {
        const { name } = req.body;
        const data = await Role.create({ name })
        res.status(201).json({success:true, data})
    } catch (err) {
        res.status(500).json({success:false, message: 'something went wrong'})
    }

}

exports.getAllRoles = async(req,res,next) => {
    try {
        const data = await Role.findAll();
        res.status(200).json({success:true, data})
    } catch (err) {
        res.status(500).json({success:false, message: 'something went wrong'})
    }
}