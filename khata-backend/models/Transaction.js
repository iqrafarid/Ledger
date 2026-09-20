
const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    person:{type:mongoose.Schema.Types.ObjectId,ref:'Person',required:true},
    amount:{type:Number,required:true},
    direction:{type:String,enum:['theyOweMe','iOwnThem'],required:true},
    notes:{type:String},
    date:{type:Date,default:Date.now},
    dueDate:{type:Date},
    settled:{type:Boolean,default:false}
},{timestamps:true});

module.exports = mongoose.model('Transaction',transactionSchema);