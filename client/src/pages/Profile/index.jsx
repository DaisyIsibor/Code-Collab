import React, { useState, useEffect } from 'react';
import { updateProfile, getUserById, deleteUser } from '../../utils/api';
import AuthService from '../../utils/auth';
import './style.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    codingLanguages: '',
    meetingPreference: '',
    role: 'None',
    location: '',
    bio: '',
  });

  const userId = AuthService.getProfile().userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserById(userId);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...profileData, userId };
      await updateProfile(userId, updatedData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile!');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        alert('Profile deleted successfully!');
        AuthService.logout(); // Log the user out after deleting their profile
        window.location.href = '/login'; // Redirect to the login page
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('There was an error deleting your profile!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={profileData.firstName || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={profileData.lastName || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={profileData.email || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={profileData.username || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Coding Languages:</label>
        <input type="text" name="codingLanguages" value={profileData.codingLanguages || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Meeting Preference:</label>
        <input type="text" name="meetingPreference" value={profileData.meetingPreference || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Role:</label>
        <select name="role" value={profileData.role || 'None'} onChange={handleChange}>
          <option value="None">None</option>
          <option value="Study Buddy">Study Buddy</option>
          <option value="Collaborator">Collaborator</option>
          <option value="Mentor">Mentor</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input type="text" name="location" value={profileData.location || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Bio:</label>
        <textarea name="bio" value={profileData.bio || ''} onChange={handleChange} />
      </div>
      <button type="submit">Update Profile</button>
      <button type="button" onClick={handleDelete} className="delete-button">Delete Profile</button>
    </form>
  );
};

export default Profile;
