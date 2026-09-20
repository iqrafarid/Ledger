require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("Error connecting to MongoDB:", err));
app.get('/api/health',(req,res)=>{
    res.status(200).json({message:"Server is running fine",status:"ok",dbStatus:mongoose.connection.readyState===1?"connected":"Not connected"})
})

app.listen(process.env.PORT,()=>{
    console.log(`Servwer is runing on port ${process.env.PORT}`)
})