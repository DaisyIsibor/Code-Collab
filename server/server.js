// This page will be required to set up & run the app

import express from "express";
import cors from "cors";
import records from "./routes/record.js";

// Setting up the port & Express server using cors
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// Starting the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});