const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Users = require("../models/Users");
const jwt = require('jsonwebtoken')
const secStr = "abcdefghijklmnopqrdtuvwxyz" 



router.post('/',[
    body('email').isEmail(),
    
    body('password').isLength({ min: 5 })], async (req, res) => {
    let email = req.body.email;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let userData = await Users.findOne({email})
        if(!userData) {
             return res.json("Email are not match")
         }
         const pwdComp = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdComp){
            return res.json("password are not match")
        }
         
        const data={
            user:userData.id
        }
        const authToken = jwt.sign(data,secStr)
       return res.json({success:true,authToken:authToken})
       

    } catch(error){
        res.json("Not found")
        res.json({success:false })
    }
   
});


module.exports = router;
