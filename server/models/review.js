import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: [200, 'Content cannot exceed 200 characters'],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  // Timestamp automatically manage createdAt and updatedAt properties
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
