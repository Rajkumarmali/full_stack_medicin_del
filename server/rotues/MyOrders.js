const express = require("express");
const MyOrders = require("../models/MyOrders");
const router = express.Router();

router.post('/', async (req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
   // console.log(req.body.email)

    
    let eId = await MyOrders.findOne({ 'email': req.body.email })    
  //  console.log(eId)
    if (eId===null) {
        try {
          //  console.log(data)
           // console.log(req.body.email)
            await MyOrders.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await MyOrders.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message) 
            res.send("Server Error", error.message)
        }
    }
})
 
router.post('/myOrderData',async (req,res)=>{
    try {
     // console.log(req.body.email)
        const eId = await MyOrders.findOne({ 'email': req.body.email })
       // console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    
})


module.exports = router;