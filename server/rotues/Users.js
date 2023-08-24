const express = require("express");
const router = express.Router();
const Users = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
router.post('/',[
body('email').isEmail(),

body('password').isLength({ min: 5 })],

async (req,res)=>{
    const { name,email,location,password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
     
    bcrypt.hash(password, 10).then((hash)=>{
         Users.create({
            name:name,
            email:email,
            location:location,
            password:hash
        }).then(()=>{
            return res.json({success:true})
        }).catch((error)=>{
             res.status(500).json({error:"Error creating user."})
             res.json({success:false })
    })
})
})

router.post('/patientDetail',async(req,res)=>{
    try {
        
           const eId = await Users.findOne({ 'email': req.body.email })
           res.json({orderData:eId})
       } catch (error) {
           res.send("Error",error.message)
       }
       
})




module.exports = router; 