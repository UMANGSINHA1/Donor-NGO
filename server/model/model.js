const mongoose=require('mongoose');
var schema=new mongoose.Schema({
    Username:{
        type:String,
        unique:true,
       
    },
    Password:{
        type:String,
        unique:true,
       
    }
   
})
const Donordb=mongoose.model('donordb',schema);

var schema2=new mongoose.Schema({
    Username:{
        type:String,
        unique:true,
       
    },
    Password:{
        type:String,
        unique:true,
       
    }
   
})
const NGOdb=mongoose.model('ngodb',schema2);
module.exports=Donordb;
module.exports=NGOdb;
