const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{type:String,required:true},
    aliases:{type:[String],default:[]},
    phone:{type:String},
    notes:{type:String}
},{timestamps:true});

module.exports = mongoose.model('Person',personSchema);
