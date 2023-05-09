const express = require("express")
const {UserModel} = require("../models/user.model")
const{auth} = require("../middlewares/auth")
const {BlacklistModel} = require("../models/blacklist.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoute = express.Router()




userRoute.get("/employee",async(req,res)=>{
    try {
        const users = await UserModel.find({role:"Employee"})
        res.send(users)
    } catch (err) {
        res.send(err.message)
    }
})
userRoute.get("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await UserModel.findOne({_id:id})
        res.status(200).send({"user":user.name})
    } catch (err) {
        res.send(err.message)
    }
})

userRoute.get("/",async(req,res)=>{
    try {
        const users = await UserModel.find()
        
        res.send(users)
    } catch (err) {
        res.send(err.message)
    }
})

userRoute.post("/signup",async(req,res)=>{
    const {name,email,password,role} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user) return res.status(400).send({"msg":"User Already There Login"})
        bcrypt.hash(password, 5, async(err, hash)=> {
            const newuser = new UserModel({name,email,password:hash,role})
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
            if(err) return res.status(400).send("Wrong Password")
           if(result){
            const accessToken = jwt.sign({UserId:`${user._id}`,role:user.role},"name",{expiresIn:"3h"})
            const refreshToken = jwt.sign({UserId:`${user._id}`,role:user.role},"rename",{expiresIn:"3h"})

            

            res.status(200).send({"msg":"login Success",accessToken,refreshToken,user})
           }else{
            return res.status(400).send({"msg":"Wrong Password"})
           }
        });
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRoute.get("/:id",auth,async(req,res)=>{
    try {
        const id = req.params.id

        const user =  await UserModel.findOne({_id:id})

        if(!user) return res.status(400).send({"msg":"No User"})

        res.status(200).send({"user":user})
     } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


    
  

userRoute.get("/logout", auth, async (req, res) => {
    try {
      const token = req.headers.authorization;
      const newAccessToken = new BlacklistModel({ token: token });
      await newAccessToken.save();
      res.status(200).send({ msg: "Logout Success" });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  });




module.exports={userRoute}