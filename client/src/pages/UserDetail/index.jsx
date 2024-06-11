import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import MessageForm from '../../components/MessageForm';
import { Button } from 'react-bootstrap';
import './style.css';

const getLoggedInUserId = () => {
  const token = localStorage.getItem('id_token');
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.userId;
};

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        console.log('Fetched user:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          },
        });
        console.log('Fetched logged-in user:', response.data);
        setLoggedInUser(response.data);
      } catch (error) {
        console.error('Error fetching logged-in user details:', error);
      }
    };

    fetchUser();
    fetchLoggedInUser();
  }, [userId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!user || !loggedInUser) {
    return <div>Loading...</div>;
  }

  console.log('Recipient user data:', user);
  console.log('Logged-in user data:', loggedInUser);

  const recipientEmail = user?.email || 'Recipient email not available';
  const senderEmail = loggedInUser?.email || 'Sender email not available';

  console.log('Recipient Email:', recipientEmail);
  console.log('Sender Email:', senderEmail);

  return (
    <div className="user-detail-container">
      <h2>{user.username ? `${user.username}'s Profile` : 'Profile'}</h2>
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
            {user.reviews.map((review) => (
              <li key={review._id}>
                <p>{review.content} - <strong>Rating:</strong> {review.rating}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button variant="primary" onClick={handleShowModal}>
        Send Message
      </Button>
      <MessageForm
        show={showModal}
        handleClose={handleCloseModal}
        senderEmail={senderEmail}
        recipientEmail={recipientEmail}
      />
    </div>
  );
};

export default UserDetail;
