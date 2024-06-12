import axios from 'axios';

const baseURL = 'http://localhost:5051/api'; // Base URL for API calls

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to update user profile
export const updateProfile = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/users/profile/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to fetch user details by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Function to fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Function to get the user count
export const getUserCount = async () => {
  try {
    const response = await axios.get(`${baseURL}/users/userCount`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user count:', error);
    throw error;
  }
};

// Function to get chat messages between two users
export const getChatMessages = async (userId1, userId2) => {
  try {
    const response = await axios.get(`${baseURL}/chat/${userId1}/${userId2}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// Function to send a chat message
export const sendChatMessage = async (messageData) => {
  try {
    const response = await axios.post(`${baseURL}/chat`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Function to add a review
export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(`${baseURL}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to fetch reviews for a specific user
export const getReviewsForUser = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/reviews/for/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to update a review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(`${baseURL}/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to delete a review
export const deleteReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.delete(`${baseURL}/reviews/${reviewId}`, { data: reviewData });
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};
