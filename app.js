const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose= require('mongoose')
const Product = require('./models/productModel')
const cors = require('cors')
const authJwt = require('./helpers/jwt')

require ('dotenv/config')

const ProductRouter = require('./routes/productsRoutes')
const CategoryRouter = require('./routes/categoryRoutes')
const UserRouter = require('./routes/userRoutes')
const OrderRouter = require('./routes/order')

const api = process.env.API_URL
//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
// app.use(authJwt())


app.use(api+'/products',ProductRouter)
app.use(api+'/categories',CategoryRouter)
app.use(api+'/users',UserRouter)
app.use(api+'/order',OrderRouter)
app.options('*',cors())




app.listen(3000,()=>{
    console.log(api)
    console.log('the server is running in http://localhost:3000')
})

app.get(api+'/products',(req,res)=>{

    res.send({message:'hello world'})
})


mongoose.connect('mongodb://0.0.0.0:27017/eshop').then(()=>{
    console.log("connected to the database")
})