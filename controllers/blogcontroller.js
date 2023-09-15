const { default: mongoose } = require('mongoose');
const db=require('../models/blog');
const user_db=require('../models/user');

const get_a_blog=async(req,res)=>{
    let blog;
    try{
        blog= await db.findById(req.params.id);
        if(!blog)
         res.status(404).json({message:"blog not found"});
        else res.status(200).json({blogs:blog});
    } catch(error){
        res.status(200).json({message:error.message});
    }
}
const getAllBlogs=async(req,res)=>{
    let blogs;
    try{
        blogs= await db.find();
        if(!blogs) 
          res.status(404).json({message:"No Blogs found"});
        else  res.status(200).json({AllBlogs:blogs});

    } catch(error){
        res.status(500).json({message : error.message});
    }
   
}

const addBlog=async(req,res)=>{
     const {title,description,image,user}=req.body;

    let user_exist;
    try{
        user_exist=await user_db.findById(user);
    } catch(error){
        res.status(500).json({message:error.message});
    }

    if(!user_exist)
      return  res.status(500).json({message:"unable to find user"});

    const blog= new db({
        title,
        description,
        image,
        user
     }); 
     try{
        const session = await mongoose.startSession();
        (await session).startTransaction();
        await blog.save({session});
        user_exist.blogs.push(blog);
        await user_exist.save({session});
        await session.commitTransaction();
       return res.status(200).json({blogs:blog});
     }catch(error){
        res.status(500).json({message : error.message});
     }
}

const updateTheBlog=async(req,res)=>{
    const { title, description }=req.body;
    const upid=req.params.id;
    let blog;
    try{
     blog =await db.findByIdAndUpdate(upid,{
        title,description
     });
    if(!blog)
     res.status(201).json({message:"blog to be updated not found"});
    else {
        res.status(200).json({blogs:blog});
    }
    } catch(error){
        res.status(500).json({message : error.message});
    }
    
}

const deleteBlog=async(req,res)=>{
    try{
        let deletedBlog=await db.findByIdAndRemove(req.params.id).populate('user');
        await deletedBlog.user.blogs.pull(deletedBlog);
        await deletedBlog.user.save();
        if(!deletedBlog)
        res.status(404).json({message:"Error in deleting a Blog!!"});
        else res.status(200).json({message:"Blog successfully deleted"});
    } catch(error){
        res.status(500).json({message : error.message});
    }
};

const getUserBlogs=async(req,res)=>{
    try{
        let userblogs=await user_db.findById(req.params.id).populate("blogs");
        if(!userblogs)
          return res.status(404).json({ message:"No blogs found for this user"});
        else return res.status(200).json({blogs:userblogs});
    } catch(error){
        res.status(500).json({message : error.message});
    }
}
module.exports={get_a_blog,getAllBlogs,addBlog,updateTheBlog,deleteBlog,getUserBlogs};