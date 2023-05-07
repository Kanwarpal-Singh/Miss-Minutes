const mongoose = require("mongoose")

const chatProfileSchema = new mongoose.Schema(
    {
      members: {
        type: Array,
      },
    },
    { timestamps: true }
  );
  

const ChatprofileModel = mongoose.model("chatsProfilechatting",chatProfileSchema)

module.exports={ChatprofileModel}