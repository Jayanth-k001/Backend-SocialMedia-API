const express=require('express');
const app=express();
const db=require('./config/dbconnection.js');
const user_router=require('./routes/user_routes.js')
const blog_router=require('./routes/blog_routes.js');
require('dotenv').config();
const port=process.env.port || 3000;


app.use(express.json());
app.use('/api/user',user_router);
app.use('/api/blogs',blog_router);

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})
