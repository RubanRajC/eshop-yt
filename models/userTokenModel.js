const mongoose = require('mongoose')

const UserTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true }
},{timestamps:true})

exports.UserToken = mongoose.model("UserToken",UserTokenSchema)