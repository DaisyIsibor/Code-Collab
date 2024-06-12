// This file displays the details of a specific user
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, getReviewsForUser, addReview } from '../../utils/api';
import AuthService from '../../utils/auth';
import Chat from '../../components/Chat/Chat';
import './style.css';

// Getting user data
const UserDetail = () => {
  // Get userId from the URL
  const { userId } = useParams();
  // Initializing user state to null
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ content: '', rating: '' });
  const [chatOpen, setChatOpen] = useState(false); // Declare chatOpen state
  // Get the current user's ID
  const currentUserId = AuthService.getProfile().userId;

  // Fetch user details and reviews when the component mounts or userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data by ID using API call
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const data = await getReviewsForUser(userId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchUser();
    fetchReviews();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = { userId: currentUserId, reviewedUserId: userId, ...newReview };
      const addedReview = await addReview(reviewData);
      setReviews((prevReviews) => [...prevReviews, addedReview.review]);
      setNewReview({ content: '', rating: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Ensure codingLanguages is an array
  const codingLanguages = Array.isArray(user.codingLanguages) ? user.codingLanguages : [];

  // Display user details
  return (
    <div className="user-detail-container">
      <h2>{user.username}'s Profile</h2>
      <img src={`/images/${user.photo}`} alt={user.username} />
      {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
      {codingLanguages.length > 0 && (
        <p><strong>Coding Languages:</strong> {codingLanguages.join(', ')}</p>
      )}
      {user.role && <p><strong>Role:</strong> {user.role}</p>}
      {user.location && <p><strong>Location:</strong> {user.location}</p>}
      {reviews.length > 0 && (
        <div>
          <strong>Reviews:</strong>
          <ul>
            {reviews.map(review => (
              <li key={review._id}>
                <p>{review.content} - <strong>Rating:</strong> {review.rating}</p>
                <p><strong>Reviewed by:</strong> {review.userId.username}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleReviewSubmit}>
        <h3>Add a Review</h3>
        <textarea
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          placeholder="Write your review"
          required
        />
        <input
          type="number"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <button onClick={() => setChatOpen(!chatOpen)}>
        {chatOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {chatOpen && <Chat userId={currentUserId} recipientId={user._id} />}
    </div>
  );
};

export default UserDetail;

