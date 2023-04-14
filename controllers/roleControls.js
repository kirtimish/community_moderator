const Role = require('../models/role')
const { Snowflake } = require('@theinternetfolks/snowflake');

exports.createRole = async(req,res,next) => {
    try {
        const { name } = req.body;
        const id = Snowflake.generate();
        console.log(id,"roleid")
        const data = await Role.create({id, name })
        res.status(201).json({success:true, data})
    } catch (err) {
        res.status(500).json({success:false, message: 'something went wrong'})
    }

}

const getPagination = (page, size) => {
    const limit = size ? +size : 2;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: roles } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, roles, totalPages, currentPage };
};

exports.getAllRoles = async(req,res,next) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const condition = null
        const response = await Role.findAndCountAll({ where: condition,limit, offset });
        const data = getPagingData(response, page, limit);

        res.status(200).json({success:true, data})
    } catch (err) {
        res.status(500).json({success:false, message: 'something went wrong'})
    }
}