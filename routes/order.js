const { Order } = require("../models/orderModel");
const { OrderItem } = require("../models/orderItemModel");
const expres = require("express");

const router = expres.Router();

router.get("/", async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user orderItems")
      .sort('{"dateOrdered":-1}');

    if (orderList) {
      res.send(orderList);
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.send(error).status(500);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const orderList = await Order.findById(req.params.id)
      .populate("user")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });

    if (orderList) {
      res.send(orderList);
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.send(error).status(500);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const orderList = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})

    if (orderList) {
      res.send(orderList);
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.send(error).status(500);
  }
});
router.delete("/delete/:id", async (req, res) => {

      Order.findByIdAndDelete(req.params.id).then(async order=>{
        if(order){
            await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success:true,message:'The order is deleted'})
        }else{
            return res.status(404).json({success:false,message:'Order is not deleted'})
        }
    }).catch(err=>{
        return res.status(500).json({success: false,error:err})
    })

  
})

router.post("/", async (req, res) => {
  try {
    console.log("working");
    const orderItemsIDs = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderitem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderitem = await newOrderitem.save();
        return newOrderitem._id;
      })
    );
    const idsOnly = await orderItemsIDs;
    console.log("id only", idsOnly);
    
    // const orderList = await Order.create(req.body)
    const orderList = new Order({
      orderItems: idsOnly,
      user: req.body.user,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      zip: req.body.zip,
    });
    let neworderList = await orderList.save();

    if (neworderList) {
      res.send(neworderList);
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.send(error).status(500);
  }
});

module.exports = router;