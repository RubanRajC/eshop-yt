const Category= require('../models/categoryModel')
const express = require('express')
const router = express.Router()

//async way
router.post('/',async(req,res)=>{
    console.log(req.body)
    const category = await Category.CategoryModel.create(req.body)
 
    if(!category){
        return res.status(404).json({msg:'Failed to create category'})
    }else{
        res.send(category)
    }
})
router.get('/',async(req,res)=>{
    console.log(req.body)
    const category = await Category.CategoryModel.find()
 
    if(!category){
        return res.status(500).json({msg:'Failed to get data'})
    }else{
        res.send(category)
    }
})
router.get('/:id',async(req,res)=>{
    console.log(req.body)
    let id = req.params.id
    const category = await Category.CategoryModel.findById(id)
 
    if(!category){
        return res.status(500).json({msg:`there is no data in this ${id}`})
    }else{
        res.send(category)
    }
})
router.put('/:id',async(req,res)=>{
    let id = req.params.id
    const category = await Category.CategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!category){
        return res.status(500).json({msg:`there is no data in this ${id}`})
    }else{
        const categoryfind = await Category.CategoryModel.findById(id)
        res.send(category)
    }
})
//Promise way
 router.delete('/:id',async(req,res)=>{
    console.log(req.params.id,541651)
    let id =req.params.id
    // let creation = await Category.CategoryModel.findByIdAndDelete(id)
    // if(creation){
    //     res.json({msg:'Deleted'})

    // }else{
    //     res.json({err:'notfound'})
    // }

    Category.CategoryModel.findByIdAndDelete(id).then(category=>{
        if(!category){
            return res.status(404).json({msg: 'No category found with that ID!'});
        }else{
            res.json({msg:"Deleted really"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
 })



module.exports = router