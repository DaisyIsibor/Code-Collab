// This page displays a list of all users with links to their profile page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, getUserCount } from '../../utils/api';
import './style.css';

// UserList component to display a list of all users
const UserList = () => {
  // Initializing users state to an empty array
  const [users, setUsers] = useState([]);
  // Initialize loading state to true
  const [loading, setLoading] = useState(true);
  // State to manage any errors
  const [error, setError] = useState(null);
  // State for user count
  const [userCount, setUserCount] = useState(0);
  // State for displayed user count (animated)
  const [displayedCount, setDisplayedCount] = useState(0);

  // Fetch all users and user count
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch all users using API call
        const userData = await getAllUsers();
        // Update users with API data
        setUsers(userData);

        // Fetch user count using API call
        const count = await getUserCount();
        // Update user count with API data
        setUserCount(count);

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

  // Animate the displayed count
  useEffect(() => {
    if (userCount > 0) {
      let start = 0;
      const duration = 2000; // Animation duration in ms
      const increment = userCount / (duration / 100); // Calculate the increment per frame

      const animateCount = () => {
        start += increment;
        if (start < userCount) {
          setDisplayedCount(Math.floor(start));
          setTimeout(animateCount, 50); // Update every 50ms
        } else {
          setDisplayedCount(userCount); // Ensure it ends exactly at the userCount
        }
      };

      animateCount();
    }
  }, [userCount]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  // Render a list of users with links to their profile page and user count
  return (
    <div>
      <h2>All Users</h2>
      <p>Total Registered Users: {displayedCount}</p> {/* Display animated user count */}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={`/images/${user.photo}`} alt={user.username}/>
              <Link to={`/users/${user._id}`}>{user.username}</Link>
              {/* ADD CODING LANGUAGES */}
              <p>{user.codingLanguage}</p>
              {/* ADD LOCATION */}
              <p> {user.location}</p>
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
