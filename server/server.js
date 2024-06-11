import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';

// For Chat
import http from 'http';
import { Server } from 'socket.io';
import ChatMessage from './models/ChatMessage.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Setting up the port
const PORT = process.env.PORT || 5051;

// Express server using cors
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"], 
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Routes
import userRoutes from './routes/user.js';
import reviewRoutes from './routes/review.js';
import chatRoutes from './routes/chat.js';

app.use('/api/users', userRoutes); // Mount user routes under /api/users endpoint
app.use('/api/reviews', reviewRoutes); // Mount review routes under /api/reviews endpoint
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ userId, recipientId }) => {
    const roomName = [userId, recipientId].sort().join('-');
    socket.join(roomName);
    console.log(`User ${userId} joined room ${roomName}`);
  });

  socket.on('leaveRoom', ({ userId, recipientId }) => {
    const roomName = [userId, recipientId].sort().join('-');
    socket.leave(roomName);
    console.log(`User ${userId} left room ${roomName}`);
  });

  socket.on('sendMessage', async (data) => {
    const { sender, recipient, message } = data;
    const newMessage = new ChatMessage({ sender, recipient, message });
    await newMessage.save();
    const roomName = [sender, recipient].sort().join('-');
    io.to(roomName).emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Starting the Express server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
