const express = require("express");
const router = express.Router();
const api = process.env.API_URL;
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const authJwt = require("../helpers/jwt");

router.post("/", async (req, res) => {
  // console.log(req.body)
  try {
    const category = await Category.CategoryModel.findById(req.body.category);
    console.log(category, "category");
    if (!category) return res.status(400).send("Invalid category");
    const create = await Product.prdocutModel.create(req.body);
    console.log(create);
    res.send(create);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/new", (req, res) => {
  const create = new Product.prdocutModel({
    name: req.body.name,
    image: req.body.image,
    stockCount: req.body.stockCount,
  });
  create
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});
//to send query params and we can fiter it with them
router.get("/all",authJwt, async (req, res) => {
  try {
    let filter ={}
    console.log(req.id,'this is id')
    if(req.query.category){
      filter = {category:req.query.category.split(',')}
    }
    const product = await Product.prdocutModel.find(filter).populate("category");
    if (product) {
      res.send(product);
    } else {
      res.status(500).json({
        error: "NO products found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//to get specific data from database
router.get("/spl", async (req, res) => {
  try {
    const product = await Product.prdocutModel.find().select("name image ");
    if (product) {
      res.send(product);
    } else {
      res.status(500).json({
        error: "NO products found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//will send product and it related category
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.prdocutModel
      .findById(req.params.id)
      .populate("category");
    if (product) {
      res.send(product);
    } else {
      res.status(500).json({
        error: "NO product found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send('False id');
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    // const category = await Category.CategoryModel.findById(req.body.category);
    // console.log(category, "category");
    // if (!category) return res.status(400).send("Invalid category");
    const product = await Product.prdocutModel
      .findByIdAndUpdate(req.params.id,req.body,{new:true})
      
    if (product) {
      res.send(product);
    } else {
      res.status(500).json({
        error: "NO product found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send('the product is cannot be update');
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    // const category = await Category.CategoryModel.findById(req.body.category);
    // console.log(category, "category");
    // if (!category) return res.status(400).send("Invalid category");
    const product = await Product.prdocutModel
      .findByIdAndDelete(req.params.id,)
      
    if (product) {
      res.send('Product is deleted');
    } else {
      res.status(500).json({
        error: "NO product found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send('No product available');
  }
});
//to retutn product count
router.get("/get/count", async (req, res) => {
    try {
      const productCount = await Product.prdocutModel.countDocuments()
      if (productCount) {
        res.send({
            products:productCount
        });
      } else {
        res.status(500).json({
          error: "NO products found",
          success: false,
        });
      }
    } catch (err) {
      res.status(501).send(err);
    }
  });
  //get feature product and limit and count
router.get("/get/feature/:count", async (req, res) => {
    try {
        const reqCount = req.params.count ? req.params.count : 0
      const product = await Product.prdocutModel.find({isFeatured:true}).limit(+reqCount)
      const Count =  await Product.prdocutModel.find({isFeatured:true}).count()
      if (product) {
        res.send({
            products:product,
            count:Count
        });
      } else {
        res.status(500).json({
          error: "NO products is featured",
          success: false,
        });
      }
    } catch (err) {
      res.status(501).send(err);
    }
  });

module.exports = router;
