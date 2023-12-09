const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    phone:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:'Pending',
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    shippingAddress1:{
        type:String,
        default:''
    },
    shippingAddress2:{
        type:String,
        default:''
    },
    street:{
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
    dateOrdered:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true })
exports.Order = mongoose.model('Order',orderSchema)