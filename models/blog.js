const mongoose= require('mongoose');

const blog_schema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    }
})

const monmodel=mongoose.model("blog",blog_schema);
module.exports= monmodel;