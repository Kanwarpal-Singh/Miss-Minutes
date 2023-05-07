const jwt = require("jsonwebtoken")
const {BlacklistModel} = require("../models/blacklist.model")



const auth = async (req,res,next)=>{
  
    try {
        const token = req.cookies.accessToken;

        if(!token) return res.status(400).send({"msg":"provide token"})

        const isBlacklisted =await BlacklistModel.findOne({token:token})
       
        if(isBlacklisted) return res.status(400).send({"msg":"login again"})

        const decoded = jwt.verify(token,"name")
        if(!decoded) return res.status(400).send({"msg":error.message})

        req.body.UserId = decoded.UserId
        req.body.role = decoded.role
        next()

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
}
   

module.exports={auth}