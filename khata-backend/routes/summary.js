const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const Transaction = require('../models/Transaction');

router.get("/api/summary",async(req,res)=>{
    try{
        const result = await Transaction.aggregate([
            {$match:{settled:false}},
            {$group:{
                _id:"$direction",
                total:{$sum:"$amount"}
            }}
        ]);
        let theyOweMe = 0, iOweThem = 0;
        result.forEach(r=>{
            if(r._id === "theyOweMe") theyOweMe=r.total;
            if(r._id === "iOweThem")   iOweThem = r.total;
        })
        const net = theyOweMe - iOweThem;

res.status(200).json({ theyOweMe, iOweThem, net });
    }catch(error){
        res.status(500).json({message:error.message})
    }
})





module.exports=router;