const express=require('express');
const router=express.Router();
const {get_a_blog,getAllBlogs,addBlog,updateTheBlog, deleteBlog,getUserBlogs}=require('../controllers/blogcontroller');

router.get('/get/:id',get_a_blog);
router.get('/getall',getAllBlogs);
router.post('/post',addBlog);
router.put('/update/:id',updateTheBlog);
router.delete('/delete/:id',deleteBlog);
router.get('/user/:id',getUserBlogs);


module.exports=router;