import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getUsersForSidebar, sendMessage, getMessages, markMessagesAsSeen } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.get("/mark/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);


export default messageRouter;