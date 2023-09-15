const mongoose= require('mongoose');


const user_schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"blog",required:true}]
})

const monmodel=mongoose.model("user",user_schema);
module.exports= monmodel;