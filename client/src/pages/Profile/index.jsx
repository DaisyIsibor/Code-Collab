import React, { useState, useEffect } from 'react';
import { updateProfile, getUserById } from '../../utils/api';
import AuthService from '../../utils/auth';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    codingLanguages: '',
    meetingPreference: '',
    role: '',
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={profileData.email} onChange={handleChange} />
      </label>
      <label>
        Username:
        <input type="text" name="username" value={profileData.username} onChange={handleChange} />
      </label>
      <label>
        Coding Languages:
        <input type="text" name="codingLanguages" value={profileData.codingLanguages} onChange={handleChange} />
      </label>
      <label>
        Meeting Preference:
        <input type="text" name="meetingPreference" value={profileData.meetingPreference} onChange={handleChange} />
      </label>
      <label>
        Role:
        <input type="text" name="role" value={profileData.role} onChange={handleChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={profileData.location} onChange={handleChange} />
      </label>
      <label>
        Bio:
        <textarea name="bio" value={profileData.bio} onChange={handleChange} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
