const expressJwt = require('express-jwt');
const secret = process.env.secret
const {UserToken} =require('../models/userTokenModel');
const { status } = require('init');
async function  authJwt(req,res,next){
    // return expressJwt({
    //     secret,
    //     algorithms: ['HS256']
    // })
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        try{
            const bearerToken = bearerHeader.split(' ')[1];
          // Search for the token in the database
          const user = await UserToken.findOne({token:bearerToken})
          console.log(user)
          if(user){
            req.id = user._id
            console.log('sending req')
            next()
          }else{
            res.status(403).json({Token:"Invalid"})
          }
        }catch(error){
            res.status(403).json({Token:"No token"})
        }
        
        }
}
module.exports=authJwt;