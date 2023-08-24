const express = require("express");
const router = express.Router();

router.post('/',(req,res)=>{
    try{
          res.send(global.doctor_list);
    } catch(error){
           res.send("Error");
    }
})

module.exports = router;