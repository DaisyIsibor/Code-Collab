import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../utils/api';
import './style.css';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
