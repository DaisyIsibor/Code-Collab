import axios from 'axios';

const baseURL = 'http://localhost:5051/api/users';

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
    const response = await axios.put(`${baseURL}/profile`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to fetch user details by ID
export const getUserById = async (userId) => {
  try {
    // Fetching user details by ID, including additional fields for the profile
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
