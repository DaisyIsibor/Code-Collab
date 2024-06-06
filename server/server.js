// This page will be required to set up & run the app

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import connectDB from './db/connection.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Setting up the port
const PORT = process.env.PORT || 5051;
// Express server using cors
const app = express();
app.use(cors());
app.use(express.json());
// Use routes
app.use("/user", userRoutes);


// Starting the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});