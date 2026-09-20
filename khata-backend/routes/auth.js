const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.post('/api/auth/register',async(req,res)=>{
    try{
    const {name,email,password}= req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"All Fields are required"})
    }
    const useremailexists = await User.findOne({email})
    if(useremailexists){
        return res.status(400).json({error:"User already exits"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newUser = await User.create({name,email,password:hashedpassword})
    res.status(201).json({message:"User is created"})
}catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/api/auth/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )
        res.status(200).json({name:user.name,token})
        
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})


module.exports=router