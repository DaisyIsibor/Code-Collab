// This page will be required to set up & run the app

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import connectDB from './db/connection.js';

// Connect to MongoDB
connectDB();

// Setting up the port & Express server using cors
const PORT = process.env.PORT || 5051;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

// Starting the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});