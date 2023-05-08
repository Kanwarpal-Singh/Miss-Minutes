const messageRoute=require("express").Router()

const {MessageModel}=require("../models/message.model")



//add

messageRoute.post("/", async (req, res) => {
    const newMessage = new MessageModel(req.body);
    console.log(newMessage)
  
    try {
      const messageSaved = await newMessage.save();
      res.status(200).json(messageSaved);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get
  
  messageRoute.get("/:chattingId", async (req, res) => {
    try {
      const messages = await MessageModel.find({
        chattingId: req.params.chattingId,
        
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);

    }
  });





module.exports={messageRoute}