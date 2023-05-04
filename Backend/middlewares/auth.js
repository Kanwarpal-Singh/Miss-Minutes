const jwt = require("jsonwebtoken")
const {BlacklistModel} = require("../models/blacklist.model")


const auth = async (req,res,next)=>{
  
 const token = req.cookies.accessToken;
console.log(token)
 const isBlacklisted =await BlacklistModel.findOne({token:token})
 if(isBlacklisted){
    res.status(400).send({"msg":"login again"})
 }else{
    try {
        const decoded = jwt.verify(token,"name")
        if(decoded){
            req.body.UserId = decoded.UserId
            req.body.role = decoded.role
            next()
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
 }
}

module.exports={auth}