import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, getReviewsForUser, addReview } from '../../utils/api';
import AuthService from '../../utils/auth';
import Chat from '../../components/Chat/Chat';
import './style.css';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ content: '', rating: '' });
  const [chatOpen, setChatOpen] = useState(false);
  const currentUserId = AuthService.getProfile().userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
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

  const codingLanguages = user.codingLanguages || '';

  return (
    <div className="user-detail-container">
      <div className="profile-header">
        <h2>{user.username}'s Profile</h2>
        <img src={`/images/${user.photo}`} alt={user.username} className="profile-photo" />
      </div>
      <div className="profile-details">
        {user.firstName && user.lastName && (
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        )}
        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        {codingLanguages && (
          <p><strong>Coding Languages:</strong> {codingLanguages}</p>
        )}
        {user.meetingPreference && (
          <p><strong>Meeting Preference:</strong> {user.meetingPreference}</p>
        )}
        {user.role && <p><strong>Role:</strong> {user.role}</p>}
        {user.location && <p><strong>Location:</strong> {user.location}</p>}
      </div>
      <button onClick={() => setChatOpen(!chatOpen)} className="chat-button">
        {chatOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {chatOpen && <Chat userId={currentUserId} recipientId={user._id} />}
      {reviews.length > 0 && (
        <div className="reviews-section">
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
      <form onSubmit={handleReviewSubmit} className="review-form">
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
    </div>
  );
};

export default UserDetail;
