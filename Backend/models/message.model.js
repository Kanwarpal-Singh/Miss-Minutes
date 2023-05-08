const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
   
    chattingId:{type:String},
    sender:{type:String},
    text:{type:String}
},{timestamps:true}
,{
    versionKey:false
})

const MessageModel = mongoose.model("message",messageSchema)

module.exports={MessageModel}