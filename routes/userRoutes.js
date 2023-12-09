const express = require('express')
const router = express.Router()
const api = process.env.API_URL;
const {User} = require('../models/userModel')
const {UserToken} = require('../models/userTokenModel')
const userModel = require('../models/userModel')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.secret

//post user
router.post('/',async(req,res)=>{
    try{
        let {name ,email} = req.body
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash : bcyrpt.hashSync(req.body.password,10) ,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,  
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
        })
          let newUser = await user.save() 
        // let user =await User.UserModel.create(req.body)
        if(newUser){
            res.send(newUser).status(200)
        }else{
            res.json({err:"NO User is created"}).status(500)
        }
    }
    catch(err){
        res.send(err).status(500)
    }
})
//get all user

router.get('/',async(req,res)=>{
    try{
        const user = await User.find().select('-passwordHash')
        if(user){
            res.send(user).status(200)
        }else{
            res.json({err:"NO User is found"}).status(500)
        }
    }catch(error){
        res.status(500).json({error:error})
    }
})
//get all user for admin

router.get('/admin',async(req,res)=>{
    try{
        const user = await User.find().select('name phone email')
        if(user){
            res.send(user).status(200)
        }else{
            res.json({err:"NO User is found"}).status(500)
        }
    }catch(error){
        res.status(500).json({error:error})
    }
})
//get specific user
router.get('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id).select('-passwordHash')
        if(user){
            res.send(user).status(200)
        }else{
            res.json({err:"No data found for this id"}).status(500)
        }
    }
    catch(error){
        res.status(500).json({error:error})
    }

})
//user login
router.post("/login", async (req, res) => {
    const user = await User.findOne({email:req.body.email})
    if(user && bcyrpt.compareSync(req.body.password,user.passwordHash)){
        
        const token = jwt.sign({
            userId:user._id,
            isAdmin:user.isAdmin
        },secret,{
            expiresIn:'2d'
        })
        const createToken = await UserToken.create({
            userId:user._id,
            token:token
        })
        return res.status(200).send({user:user.email,token: token,createdToken:createToken})
    }else{
       
        return res.status(400).json({message:'password is wrong'});
    }
})

module.exports = router;