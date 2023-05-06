const mongoose = require("mongoose")

const chatProfileSchema = mongoose.Schema({
   
    members:{type:Array}
},{timestamps:true}
,{
    versionKey:false
})

const ChatprofileModel = mongoose.model("chatsProfilechatting",chatProfileSchema)

module.exports={ChatprofileModel}