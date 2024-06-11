import Review from '../models/review.js';
import User from '../models/user.js';

const reviewController = {};

// Function to add a new review
reviewController.addReview = async (req, res) => {
  try {
    const { userId, reviewedUserId, content, rating } = req.body;

    // Validate if the userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate if the reviewedUserId exists
    const reviewedUser = await User.findById(reviewedUserId);
    if (!reviewedUser) {
      return res.status(404).json({ message: 'Reviewed user not found' });
    }

    // Create a new review
    const newReview = new Review({ userId, reviewedUserId, content, rating });

    // Save the review to the database
    await newReview.save();

    res.json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all reviews
reviewController.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ message: 'Error retrieving reviews' });
  }
};

// Function to get a single review by ID
reviewController.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (error) {
    console.error('Error retrieving review:', error);
    res.status(500).json({ message: 'Error retrieving review' });
  }
};

// Function to update a review by ID
reviewController.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

// Function to delete a review by ID
reviewController.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};

// Function to get reviews by user ID
reviewController.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ message: 'Error retrieving reviews' });
  }
};

// Function to get reviews for a specific user ID
reviewController.getReviewsForUser = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedUserId: req.params.userId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ message: 'Error retrieving reviews' });
  }
};

export default reviewController;
