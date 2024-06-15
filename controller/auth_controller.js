
const AuthServices = require('../services/auth_service')
const {isValidUserData}=require('../validation/auth_validation')



exports.register = async(req,res,next)=>{
    try {
        const userData = req.body
        if(!isValidUserData(userData)){
            return res.status(404).json({ status: false, error: "Unvalid format" });
        }
        


        const user = await AuthServices.registerUser(userData)

        res.json({status:true,succes:"User Registered Successfully",body:user});


    } catch (error) {
        res.status(500).json({ status: false, error: "Internal Server Error", });
    }
}

exports.login = async(req,res,next)=>{
    try {
        const userData = req.body
        
        const tokens  = await AuthServices.loginUser(userData);
        res.status(200).json({ status: true, accessToken: tokens.accessToken,refreshToken:tokens.refreshToken});

       
        
    } catch (error) {

        res.status(401).json({ status: false, error: error.message });
    }
}

exports.refreshToken = async(req,res,next)=>{
      
    try {
        const data = req.body
        const newAccessToken = await AuthServices.refreshToken(data)
        res.status(200).json({ status: true, newAccessToken: newAccessToken});
    } catch (error) {
        res.status(401).json({ status: false, error: error.message });
    }


}

