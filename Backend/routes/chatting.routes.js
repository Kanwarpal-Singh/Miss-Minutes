const userRoute=require("express").userRoute()

const {ChatprofileModel}=require("../models/chatting.model")



// * Starting a new chatting

userRoute.post("/", async (req, res) => {
    const newChat = new ChatprofileModel({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedChat = await newChat.save();
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
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json(err);
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