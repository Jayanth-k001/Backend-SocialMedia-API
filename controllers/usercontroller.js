const db=require('../models/user');
const bcrypt=require('bcryptjs');

const getAllUsers=async(req,res)=>{
    let users;
    try{
        users= await db.find();
        if(!users)
          res.status(404).json({message: "Users not found"});
        else res.status(200).json({users});
    } catch(error) {
        res.status(500).json({message : error.message});
    }
}

const signup= async(req,res)=>{
    let existingUser;
    try{
        existingUser= await db.findOne({ email: req.body.email});
       
    } catch(error){
        res.status(500).json({message : error.message});
    }
    if(existingUser)
    return res.status(400).json({message:"user Already exists"});
    else {
        const hashedpassword=bcrypt.hashSync(req.body.password);
          const data =new db({
              name:req.body.name,
              email:req.body.email,
              password:hashedpassword,
              blogs:[]
          });
    try{
        const savedData= await data.save();
        res.status(201).json({savedData});
    } catch(error){
        res.status(500).json({message : error.message});
    }
   }
}   

const login=async(req,res)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser= await db.findOne({ email: req.body.email});
       
    } catch(error){
        res.status(500).json({message : error.message});
    }
    if(!existingUser)
      return res.status(404).json({message:"Couldn't Login, please signup"});

    const is_password=bcrypt.compareSync(password,existingUser.password);
    if(!is_password)
      return res.status(400).json({message:"incorrect password"});
    else return res.status(200).json({message:" Login successfull"});
}
module.exports={ getAllUsers,signup,login};