const userRoute=require("express").userRoute()

const {MessageModel}=require("../models/message.model")



//add

userRoute.post("/", async (req, res) => {
    const newMessage = new MessageModel(req.body);
  
    try {
      const messageSaved = await newMessage.save();
      res.status(200).json(messageSaved);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get
  
  userRoute.get("/:messagingId", async (req, res) => {
    try {
      const messages = await MessageModel.find({
        messagingId: req.params.messagingId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });





module.exports={userRoute}