const userRoute=require("express").Router()


const {ChatprofileModel}=require("../models/chatting.model")



// * Starting a new chatting
userRoute.get("/test",(req,res)=>{
 
   res.send("working finen")
})

userRoute.post("/", async (req, res) => {
    const newChat =  new ChatprofileModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    console.log(newChat)
  
  
    try {
    
      const savedChat = await newChat.save();
      console.log(savedChat,"jsdfd")
      res.status(200).json(savedChat);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //*  Get chatting  of a user
  
  userRoute.get("/:userId", async (req, res) => {
    try {
      const chats = await ChatprofileModel.find({
        members: { $in: [req.params.userId] },
      });
      console.log(chats)
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  // get conv includes two userId
  
  userRoute.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const chat = await  ChatprofileModel.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(chat)
    } catch (err) {
      res.status(500).json(err);
    }
  });







module.exports={userRoute}