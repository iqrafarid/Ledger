const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Person = require('../models/Person');

router.post('/',async(req,res)=>{
    try{
        const{person,amount,direction,notes,date,dueDate}= req.body;
        if(!person || !amount || !direction){
            return res.status(400).json({message:"Person, amount and direction are required"});
        }
        const personExists = await Person.findById(person);
        if(!personExists){
            return res.status(404).json({message:"Person not found"});
        }
        const newTransaction = await Transaction.create(req.body);
        res.status(201).json(newTransaction);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/person/:personId',async(req,res)=>{
    try{
        const trancations = await Transaction.find({person:req.params.personId}).sort({date:-1});
        if(!trancations){
            return res.status(200).json({message:"No transactions done by this person"});
        }
        res.status(200).json(trancations);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.put('/:id/settle',async(req,res)=>{
    try{
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id,{settled:true},{new:true});
        if(!updatedTransaction){
            return res.status(404).json({message:"Transaction not found"});
        }
        res.status(200).json(updatedTransaction);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})


//Due Date
router.get('/upcoming', async(req,res)=>{
    try{
        const today = new Date();
        today.setHours(0,0,0,0)
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate()+2);
        const upcomingtransactions = await Transaction.find({
            dueDate: { $gte: today, $lte: nextDate },
            settled: false
        }).populate('person')
        res.status(200).json(upcomingtransactions)

    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports=router;