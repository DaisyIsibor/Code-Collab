// This file sets up and runs the server

import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './db/connection.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Setting up the port
const PORT = process.env.PORT || 5051;

// Express server using cors
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import userRoutes from "./routes/user.js";
import reviewRoutes from "./routes/review.js";

app.use("/api/users", userRoutes); // Mount user routes under /api/users endpoint
app.use("/api/reviews", reviewRoutes); // Mount review routes under /api/reviews endpoint

// Starting the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
