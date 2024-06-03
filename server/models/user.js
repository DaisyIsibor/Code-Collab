// This page will contain the structure for User model

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: { type: String, required: true },
    bio: String,
    codingLanguages: [String],
    location: String,
    photo: String, // Store the path to the uploaded photo
    meetingPreference: { type: String, enum: ['in person', 'online'] },
    connectionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Store IDs of connected users
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Store IDs of reviews
    role: { type: String, enum: ['none', 'observer', 'study buddy', 'mentor', 'collaborator'], default: 'none' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;


