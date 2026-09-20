const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Person = require('../models/Person');
const Transaction = require('../models/Transaction');


router.get('/',async(req,res)=>{
    try{
        const persons = await Person.find().sort({name:1});
        if(!persons){
            return res.json({message:"No persons found"});
        }
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/search',async(req,res)=>{
    try{
        const {q} = req.query;
        let person = await Person.find({
            $or:[
                {name:{ $regex:q, $options: "i"}},
                {aliases:{ $regex:q, $options: "i"}}
            ]
        })
        res.status(200).json(person)

    }catch (error) {
        res.status(500).json({message: error.message});
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const person = await Person.findById(req.params.id);
        if(!person){
            return res.status(404).json({message:"No persons found"});
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/',async(req,res)=>{
    try{
        const {name,aliases,phone,notes,confirmCreate} = req.body;
        if(!name){
            return res.status(400).json({message:"Name is required"});
        }
        if(confirmCreate!==true){
            let matches = await Person.find({
                $or:[
                    {name:{$regex:req.body.name,$options:"i"}},
                    {aliases:{$regex:req.body.name,$options:"i"}}
                ]
            })
            if(matches.length>0){
                return res.status(200).json({ message:"Possible duplicates found", possibleMatches: matches} );
            }

        }
        const newPerson = await Person.create(req.body);
        res.status(201).json(newPerson);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const {name,aliases,phone,notes} = req.body;
        if(!name){
            return res.status(400).json({message:"Name is required"});
        }
        const updatedperson= await Person.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        if(!updatedperson){
            return res.status(404).json({message:"No persons found"});
        }
        res.status(200).json(updatedperson);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const deletedperson = await Person.findByIdAndDelete(req.params.id);
        if(!deletedperson){
            return res.status(404).json({message:"No persons found"});
        }
       res.status(200).json({message:"Person deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get("/:id/summary",async(req,res)=>{
    try{
        //const transactions = await Transaction.find({ person: personId, settled: false });
//const theyOweMe = transactions
//.filter(t => t.direction === "theyOweMe")
//.reduce((sum, t) => sum + t.amount, 0);

//const iOweThem = transactions
//.filter(t => t.direction === "iOweThem")
//.reduce((sum, t) => sum + t.amount, 0);

const results = await Transaction.aggregate([
            {$match:{person: new mongoose.Types.ObjectId(req.params.id), settled:false}},
            {$group:{_id:"$direction",total:{$sum:"$amount"}}}
        ])

        let theyOweMe = 0, iOweThem = 0;
results.forEach(r => {
  if (r._id === "theyOweMe") theyOweMe = r.total;
  if (r._id === "iOweThem") iOweThem = r.total;
});
const net = theyOweMe - iOweThem;

res.status(200).json({ theyOweMe, iOweThem, net });


    }catch(error){
        res.status(500).json({message:error.message});
    }
})


module.exports = router;






