import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// Update profile route
router.put('/profile', authMiddleware, userController.updateProfile);

// Get connection history route
router.get('/connections', authMiddleware, userController.getConnectionHistory);

// Add review route
router.post('/review', authMiddleware, userController.addReview);

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.patch('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

// Route to get the logged-in user's data
router.get('/me', authMiddleware, userController.getLoggedInUser);

export default router;
