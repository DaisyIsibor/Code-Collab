import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Route to add a new review
router.post('/', reviewController.addReview);

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get a single review by ID
router.get('/:id', reviewController.getReviewById);

// Update a review by ID
router.put('/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewController.deleteReview);

// Get reviews by user ID
router.get('/user/:userId', reviewController.getReviewsByUser);

// Get reviews for a specific user ID
router.get('/for/:userId', reviewController.getReviewsForUser);

export default router;
