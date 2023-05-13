//create apis
import express from "express";
import Signup from "../Controller/Signup.js";
import { updateProfile } from "../Controller/Signup.js";
import Logins from "../Controller/LOGIN.js";

import {UploadFile} from '../UploadFile.js'
import { getImage, UploadImage} from "../Controller/UploadImage.js";
import { authenticateToken, createNewToken } from '../Controller/JWT.js';
import { createPost,getAllPosts, getPost,updatePost,deletePost } from "../Controller/PostController.js";
import { newComment,deleteComment,getComments } from "../Controller/CommentC.js";
import { getProfile } from "../Controller/Profile.js";

const router = express.Router();
router.post('/signup',Signup); //api endpoint - if want to call specific api use call back , now in controller
router.post('/login',Logins); //api endpoint - if want to call specific api use call back , now in controller
router.post('/file/upload', UploadFile.single('file'), UploadImage);//all these requestes take three params, first route, second middle ware, third api fucntion
//what is middle ware -actual api call se phly middle ware 
router.get('/file/:filename', getImage);//get image from database // const file = await gfs.files.findOne({ filename: req.params.filename });
//router.post('/file/upload', UploadFile.single('file'), UploadImage);
router.post('/create',  createPost);//get image 
router.get('/posts', getAllPosts);
router.get('/post/:id', getPost);

router.post('/comment/new' ,newComment);
router.get('/comments/:id', getComments);
router.delete('/comment/delete/:id', deleteComment);

router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

router.get('/profile',getProfile);
router.post('/save/profile',updateProfile);

//authenticateToken, authenticateToken,  authenticateToken , authenticateToken , authenticateToken , authenticateToken , authenticateToken , authenticateToken
/*
router.post('/logout', logoutUser);
router.post('/token', createNewToken);

*/
export default router;

