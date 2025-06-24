import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import {
  signup,
  login,
  updateProfile,
  checkAuth
} from '../controllers/userController.js'; // ✅ add this line

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;
