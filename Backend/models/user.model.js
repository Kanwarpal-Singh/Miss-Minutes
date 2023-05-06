const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: {type: String, enum: ["User", "Admin", "Super Admin"],default:"User"}
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}