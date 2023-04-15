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
        const response = await Community.findAndCountAll({where: condition, limit, offset, attributes: ['id', 'name', 'slug','createdAt','updatedAt'], include: [
            { model: User, attributes: ['id', 'name'] }
        ]})
        const data = getPagingData(response, page, limit);
        res.status(200).json({ success: true, data})
    } catch (err) {
        res.status(500).json({ success: false, err})
    }
}

exports.getAllMembers = async(req,res,next) => {
    try {
        const id = req.params.id;
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        console.log(id,'>> community id')
        
        const response = await Member.findAndCountAll({ where: { communityId: id },limit, offset })
        const data = getPagingData(response, page, limit);
        res.status(200).json({ success: true, content:data })
    } catch (error) {
        res.status(200).json({ success: false, message:'Internal Server Error' })
    }
}

exports.getMyOwnedCommunities = async(req,res,next) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const response = await Community.findAndCountAll({ where: { owner: req.user.id} , limit, offset});
        // console.log(data, 'my oned communities')
        const data = getPagingData(response, page, limit)
        res.status(200).json({ success:true, data})
    } catch (err) {
        res.status(500).json({ success: false, err})
    }
}

exports.getMyJoinedCommunities = async(req,res,next) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const memberRole = await Role.findOne({ where: { name: 'Community Member' } });
        // console.log(memberRole.id, 'id of memberrole')
        const result = await Member.findAll({ attributes: ['communityId'], where:{userId: req.user.id, roleId: memberRole.id}});
        // console.log(result,'>>>')
        let communityIdArray = [];
        result.forEach(id => {
            communityIdArray.push(id.communityId)
        });
        // console.log(communityIdArray)

        const response= await Community.findAndCountAll({attributes:['id','name'],where:{id:communityIdArray}, limit, offset, include: [
            { model: User, attributes: ['id', 'name'] }
        ]});
        const data = getPagingData(response, page, limit)
        res.status(200).json({ status: true, content: data})
    } catch (error) {
        res.status(500).json({ status: false, message:'internal Server error'})
    }
}