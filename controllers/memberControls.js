const Member = require('../models/member')
const { Snowflake } = require('@theinternetfolks/snowflake');

exports.addMember = async(req,res,next) => {
    try {
        const { community, user, role } = req.body;
        
        //for checking current user if admin
        const adminCheck= await Member.findOne({where:{ communityId:community,userId:req.user.id}});
        // console.log(adminCheck)

        if(!adminCheck){
            return res.status(400).json({message:"NOT_ALLOWED_ACCESS"});
        }
        const id = Snowflake.generate();
        const data = await Member.create({ id, communityId:community, userId:user, roleId:role})
        return res.status(200).json({status: true ,content:data});
    } catch (err) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.deleteMember = async(req,res,next) => {
    try {
        const id = req.params.id;
        const member = await Member.findOne({where:{ id:id}});
        console.log(member)
        //for checking current user if admin
        const adminCheck= await Member.findOne({where:{ communityId:member.communityId,userId:req.user.id}});
        // console.log(adminCheck)
        if(!adminCheck){
            return res.status(400).json({message:"NOT_ALLOWED_ACCESS"});
        }
   
        const data = await Member.destroy({where:{id:id} })
        return res.status(200).json({ status: true });
    } catch (error) {
        
    }
}