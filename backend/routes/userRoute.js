import express from 'express';
import { loginUser,registerUser,getUserProfile,adminLogin, updateprofile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.get('/profile', getUserProfile); // Assuming you have a getUserProfile function in userController.js
// Apply auth middleware to all routes below
// Assuming you have a getUserProfile function
userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin', adminLogin)
userRouter.put('/profileUpdate/:email',upload.single("image"),updateprofile);
export default userRouter;