const express = require("express")
const {UserModel} = require("../models/user.model")
const{auth} = require("../middlewares/auth")
const {BlacklistModel} = require("../models/blacklist.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoute = express.Router()




userRoute.get("/",async(req,res)=>{
    try {
        const users = await UserModel.find()
        console.log(users)
        res.send(users)
    } catch (err) {
        res.send(err.message)
    }
})

userRoute.post("/signup",async(req,res)=>{
    const {name,email,pass,role} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user) return res.status(400).send({"msg":"User Already There Login"})
        bcrypt.hash(pass, 5, async(err, hash)=> {
            const newuser = new UserModel({name,email,pass:hash,role})
            await newuser.save()
            res.status(200).send({"msg":"Register Success"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).send({"msg":"register First"})
        bcrypt.compare(password, user.password, async(err, result) =>{
           if(result){
            const accessToken = jwt.sign({UserId:`${user._id}`,role:user.role},"name",{expiresIn:"180s"})
            const refreshToken = jwt.sign({UserId:`${user._id}`,role:user.role},"rename",{expiresIn:"300s"})

            res.cookie("accessToken", accessToken , {httpOnly:true})
            res.cookie("refreshToken", refreshToken , {httpOnly:true})

            res.status(200).send({"msg":"login Success",accessToken,refreshToken})
           }
        });
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRoute.get("/logout",auth,async(req,res)=>{
    const {accessToken,refreshToken} = req.cookies
  
    try {
      const newaccestoken = new BlacklistModel({token:accessToken})
      const newrefreshtoken = new BlacklistModel({token:refreshToken})
  
      await newaccestoken.save()
      await newrefreshtoken.save()
    
       res.status(200).send({"msg":"logout Sucess", newaccestoken,newrefreshtoken})
    } catch (error) {
      res.status(400).send({"msg":error.message})
    }
  })




module.exports={userRoute}