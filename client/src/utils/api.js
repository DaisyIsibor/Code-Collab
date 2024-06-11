import axios from 'axios';

const baseURL = 'http://localhost:5051/api/users'; // This is how vite knows where to go 

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
};

// Function to update user profile
export const updateProfile = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/profile`, userId, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to fetch user details by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Function to fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Function to get the user count
export const getUserCount = async () => {
  try {
    const response = await axios.get(`${baseURL}/userCount`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching user count:', error);
    throw error;
  }
};

// New functions for chat messages
export const getChatMessages = async (userId1, userId2) => {
  try {
    const response = await axios.get(`http://localhost:5051/api/chat/${userId1}/${userId2}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

export const sendChatMessage = async (messageData) => {
  try {
    const response = await axios.post('http://localhost:5051/api/chat', messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
