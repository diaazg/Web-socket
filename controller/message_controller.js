const MessageSerivce = require('../services/message_service')

exports.allMessages = async(req,res,next)=>{
    try {
        const body = req.body 
        const messages = await MessageSerivce.getAll(body)
        res.json({status:true,body:messages});
        
    } catch (error) {
        throw error
    }
}