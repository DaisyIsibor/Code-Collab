import express from 'express';
import ChatMessage from '../models/ChatMessage.js';

const router = express.Router();

// Endpoint to fetch chat messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await ChatMessage.find({
      $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ message: 'Error fetching chat messages' });
  }
});

// Endpoint to send a chat message
router.post('/', async (req, res) => {
  try {
    const { sender, recipient, message } = req.body;
    const newMessage = new ChatMessage({ sender, recipient, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending chat message:', error);
    res.status(500).json({ message: 'Error sending chat message' });
  }
});

export default router;
