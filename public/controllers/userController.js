// Import required modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Review = require('../models/Review');



// User Controller object
const userController = {};

// Function to handle user registration
userController.register = async (req, res) => {
    try {
        // Extract user input from request body
        const { email, username, password } = req.body;

        // Check if user with the given email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Redirect to profile creation page with token
        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to handle user login
userController.login = async (req, res) => {
    try {
        // Extract user input from request body
        const { username, password } = req.body;

        // Check if user exists with the provided username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Redirect to profile creation page with token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to handle profile creation and update
userController.updateProfile = async (req, res) => {
    try {
        // Extract user input from request body
        const { firstName, lastName, bio, codingLanguages, location, photo, meetingPreference } = req.body;

        // Get user ID from request
        const userId = req.user.userId;

        // Find user by ID and update profile fields
        await User.findByIdAndUpdate(userId, {
            $set: {
                firstName,
                lastName,
                bio,
                codingLanguages,
                location,
                photo,
                meetingPreference
            }
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
        // Get user ID from request
        const userId = req.user.userId;

        // Find user by ID and populate connection history
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
        // Extract review data from request body
        const { userId, content, rating } = req.body;

        // Create a new review instance
        const newReview = new Review({ userId, content, rating });

        // Save the review to the database
        await newReview.save();

        // Update user's reviews array
        await User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id } });

        res.json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

















module.exports = userController;