import express from 'express';
import emailController from '../controllers/emailController.js';

const router = express.Router();

// Route to handle sending messages
router.post('/sendMessage', emailController.sendMessage);

export default router;
