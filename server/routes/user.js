import express from "express";
// This will help us connect to the database
import db from "../db/connection.js";
// This will help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
// We create the express router

const router = express.Router();

// Then we will start with our API endpoints

// Get all users
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      languages: req.body.languages,
      role: req.body.role,
    };

    const collection = await db.collection("users");
    const result = await collection.insertOne(newUser);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding user" });
  }
});

// Update a user by ID
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        languages: req.body.languages,
        role: req.body.role,
      },
    };

    const collection = await db.collection("users");
    const result = await collection.updateOne(query, updates);
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection("users");
    const result = await collection.deleteOne(query);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
