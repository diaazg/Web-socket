const bcrypt = require(`bcrypt`);
const {bcrypt_rounds} = require('../constants')
const AuthServices = require('../services/auth_service')
const {isValidUserData}=require('../validation/auth_validation')


exports.register = async(req,res,next)=>{
    try {
        const userData = req.body
        if(!isValidUserData(userData)){
            return res.status(404).json({ status: false, error: "Unvalid format" });
        }
        const hashedPassword = await bcrypt.hash(userData.password,parseInt(bcrypt_rounds))
        console.log(hashedPassword)
       const user = await AuthServices.registerUser({...userData,password:hashedPassword})
        res.json({status:true,succes:"User Registered Successfully",body:user});


    } catch (error) {
        console.log(bcrypt_rounds)
        console.error(error);
        res.status(500).json({ status: false, error: "Internal Server Error", });
    }
}