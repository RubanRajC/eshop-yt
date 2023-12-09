const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true 
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },

}, { timestamps: true })
// const UserModel =  
exports.User= mongoose.model("User",userSchema)
exports.userSchema= userSchema
    
