const { Snowflake } = require('@theinternetfolks/snowflake');
const Community = require('../models/community')
const Role = require('../models/role')
const Member = require('../models/member');
const User = require('../models/user');

exports.createCommunity = async(req,res,next) => {
    try {
        const { name } = req.body;
        // const slug = name.lowercase();
        const id = Snowflake.generate();
        const community = await req.user.createCommunity({ id, name });
        console.log(community, '>>>')
        const adminRole = await Role.findOne({ where: { name: 'Community Admin' } });
        console.log(adminRole)
        const admin = await Member.create({
            id,
            communityId: community.id,
            userId: req.user.id,
            roleId: adminRole.id
        })
        console.log(admin)
        res.status(200).json({ community, success: true})
    } catch (err) {
        res.status(500).json({ success: false, err})
    }
}

const getPagination = (page, size) => {
    const limit = size ? +size : 2;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: communities } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, communities, totalPages, currentPage };
};

exports.getAllCommunities = async(req,res,next) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const condition = null
        const response = await Community.findAndCountAll({where: condition,limit, offset, attributes: ['id', 'name', 'slug','createdAt','updatedAt'], include: [
            { model: User, attributes: ['id', 'name'] }
        ]})
        const data = getPagingData(response, page, limit);
        res.status(200).json({ success: true, data})
    } catch (err) {
        res.status(500).json({ success: false, err})
    }
}