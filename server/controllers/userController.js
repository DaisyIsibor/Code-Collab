// This file handles operations such as registration, login, update profile, etc.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Review from '../models/review.js';

const userController = {};

// Function to handle user registration
userController.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists!' });
        }
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the provided details
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        // Saving new user
        await newUser.save();

        // Generate JWT token for the user 
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

         // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token for the user
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
        const { firstName, lastName, email, bio, username, codingLanguages, location, meetingPreference, role } = req.body;

        // Extract the userId
        const userId = req.body.userId;

        // Update the user's profile with the provided details
        await User.findByIdAndUpdate(userId, {
            $set: {
                firstName,
                lastName,
                email,
                bio,
                username,
                codingLanguages,
                location,
                meetingPreference,
                role,
            }
        });

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: error.message });
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

        // Create a new review with the provided details
        const newReview = new Review({ userId, content, rating });

        // Save the new review
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
        // Fetching user details by ID, excluding the email for privacy reasons
        const user = await User.findById(req.params.id)
            .populate('reviews')
            .select('-email');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

export default userController;
