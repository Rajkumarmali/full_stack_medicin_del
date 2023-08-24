const express = require("express");
const router = express.Router();

router.post('/',(req,res)=>{
    try{
        //  console.log([global.medicine_item])
          res.send([global.medicine_item, global.medicine_category])
    } catch(error){
        res.send("Error")
    }
})





module.exports = router;

//global.medicine_item