// This page displays a list of all users with links to their profile page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../utils/api';
import './style.css';

// UserList component to display a list of all users
const UserList = () => {
  // Initializing users state to an empty array
  const [users, setUsers] = useState([]);
  // Initialize loading state to true
  const [loading, setLoading] = useState(true);
  // State to manage any errors
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users using API call
        const data = await getAllUsers();
        // Update users with API data
        setUsers(data);
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        // Log any error that occurs and set the error state
        console.error('Error fetching users:', error.message ? error.message : error);
        setError(error);
        setLoading(false);
      }
    };

    // Call fetchUsers when component mounts
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  // Render a list of users with links to their profile page
  return (
    <div>
      <h2>All Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <Link to={`/users/${user._id}`}>{user.username}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default UserList;
