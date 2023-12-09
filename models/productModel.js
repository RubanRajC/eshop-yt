const mongoose = require('mongoose')

const productSchema =  mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:'',
    },
    image:{
        type:String,
        default:'',
    },
    imageArr:[{
        type:String,
       
    }],
    brand:{
        type:String,
        default:'',
    },
    price:{
      type:Number,
      default:0  
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    stockCount:{
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    
}, { timestamps: true })

    productSchema.virtual('id').get(function(){
        return this._id.toHexString()
    })
    productSchema.set('toJSON',{
        virtuals:true
    })

const prdocutModel =  mongoose.model('Product',productSchema)

module.exports ={
    prdocutModel
}