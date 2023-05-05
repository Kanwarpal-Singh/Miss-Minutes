const mongoose  = require("mongoose")

const blacklistSchema = mongoose.Schema({
    token:{type:String}
})

const BlacklistModel = mongoose.model("blaklist",blacklistSchema)

module.exports={BlacklistModel}