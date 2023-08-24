const express = require('express');
const router = express.Router();
const Mydoctors = require('../models/MyDoctors');

router.post('/', async (req, res) => {
    try {
        const data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date }); 
        
        const existingDoctor = await Mydoctors.findOne({ email: req.body.email });

        if (!existingDoctor) {
            
            await Mydoctors.create({
                email: req.body.email,
                order_data: [data] 
            });
            res.json({ success: true });
        } else {
            
            await Mydoctors.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } } 
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});
router.post('/MyDoctordata',async(req,res)=>{
    try {
        // console.log(req.body.email)
           const eId = await Mydoctors.findOne({ 'email': req.body.email })
          // console.log(eId)
           res.json({orderData:eId})
       } catch (error) {
           res.send("Error",error.message)
       }
})

module.exports = router;
