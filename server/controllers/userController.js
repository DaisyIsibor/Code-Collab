import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Review from '../models/review.js';

const userController = {};

// Function to handle user registration
userController.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle user login
userController.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle profile creation and update
userController.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, codingLanguages, location, photo, meetingPreference } = req.body;

    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      $set: {
        firstName,
        lastName,
        bio,
        codingLanguages,
        location,
        photo,
        meetingPreference,
      },
    });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get user's connection history
userController.getConnectionHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('connectionHistory', 'firstName lastName');

    res.json(user.connectionHistory);
  } catch (error) {
    console.error('Error fetching connection history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to handle adding reviews
userController.addReview = async (req, res) => {
  try {
    const { userId, content, rating } = req.body;

    const newReview = new Review({ userId, content, rating });

    await newReview.save();

    await User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id } });

    res.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get a single user by ID
userController.getUserById = async (req, res) => {
  try {
    // Fetching user details by ID, including email for this specific case
    const user = await User.findById(req.params.id).populate('reviews');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

// Function to get all users
userController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Create a new user
userController.createUser = async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      bio: req.body.bio,
      codingLanguages: req.body.codingLanguages,
      location: req.body.location,
      photo: req.body.photo,
      meetingPreference: req.body.meetingPreference,
      role: req.body.role,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding user' });
  }
};

// Update a user by ID
userController.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete a user by ID
userController.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Function to get the logged-in user's data
userController.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default userController;
