// This file displays the details of a specific user
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../utils/api';
import './style.css';

// Getting user data
const UserDetail = () => {
  // // Get userId from the URL
  const { userId } = useParams();
  // Initializing user state to null
  const [user, setUser] = useState(null);

 // Fetch user details when the component mounts or userId changes
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

    // Call when component mounts
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Display user details
  return (
    <div className="user-detail-container">
      <h2>{user.username}'s Profile</h2>
      {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
      {user.codingLanguages && user.codingLanguages.length > 0 && (
        <p><strong>Coding Languages:</strong> {user.codingLanguages.join(', ')}</p>
      )}
      {user.role && <p><strong>Role:</strong> {user.role}</p>}
      {user.location && <p><strong>Location:</strong> {user.location}</p>}
      {user.reviews && user.reviews.length > 0 && (
        <div>
          <strong>Reviews:</strong>
          <ul>
            {user.reviews.map(review => (
              <li key={review._id}>
                <p>{review.content} - <strong>Rating:</strong> {review.rating}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
