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
// <<<<<<< feature/imon-final2

//   const userId = AuthService.getProfile().userId;


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
// <<<<<<< feature/imon-final2

//     fetchProfile();
//   }, [userId]);

// =======
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
// <<<<<<< feature/imon-final2

// =======
// >>>>>>> main
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
// <<<<<<< feature/imon-final2

// =======
// >>>>>>> main
  return (
    <form onSubmit={handleSubmit} className="profile-form">
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
        <select name="meetingPreference" value={profileData.meetingPreference} onChange={handleChange}>
          <option value="inPerson">In Person</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div className="form-group">
        <label>Role:</label>
        <select name="role" value={profileData.role} onChange={handleChange}>
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
// <<<<<<< feature/imon-final2
// =======



// // // <<<<<<< feature/imon-review
// // import AuthService from '../../utils/auth';


// // // >>>>>>> main
// // import Auth from '../../utils/auth.js';
// // import React, { useState, useEffect } from 'react';
// // import { updateProfile, getUserById, deleteUser } from '../../utils/api.js';
// // //  main
// // import './style.css';

// // const Profile = () => {
// //   const [profileData, setProfileData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     username: '',
// //     codingLanguages: '',
// //     meetingPreference: '',
// //     role: 'None',
// //     location: '',
// //     bio: '',
// //   })
// //   };

// // // <<<<<<< feature/imon-review
// // //   const userId = AuthService.getProfile().userId;

// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       try {
// // //         const data = await getUserById(userId);
// // //         setProfileData(data);
// // //       } catch (error) {
// // //         console.error('Error fetching profile:', error);
// // //       }
// // //     };

// // //     fetchProfile();
// // //   }, [userId]);
// // // =======
// //   // useEffect hook to fetch user data and pre-set form data 
// //   useEffect(() => {
// //     // Get user data and update state
// //     // Define by user id and then send data to it 
// //     getUserById (Auth.getProfile().userId).then(data => {
// //       console.log(data)
// //       setFormData({
// //         ...formData,
// //         firstName: data.firstName,
// //         lastName: data.lastName,
// //         email: data.email, 
// //         username: data.username,
// //         codingLanguages: data.codingLanguages,
// //         meetingPreference: data.meetingPreference,
// //         role: data.role,
// //         location: data.location,
// //         bio: data.bio,
// //       });
// //     });
// //     // Empty dependency array so that useEffect only runs once 
// //   }, []);
// // // >>>>>>> main

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfileData({ ...profileData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// // // <<<<<<< feature/imon-review
// //       const updatedData = { ...profileData, userId };
// //       await updateProfile(userId, updatedData);
// //       alert('Profile updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating profile:', error);
// //       alert('There was an error updating your profile!');
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
// //       try {
// //         await deleteUser(userId);
// //         alert('Profile deleted successfully!');
// //         AuthService.logout(); // Log the user out after deleting their profile
// //         window.location.href = '/login'; // Redirect to the login page
// //       } catch (error) {
// //         console.error('Error deleting profile:', error);
// //         alert('There was an error deleting your profile!');
// //       }

// // //       const response = await updateProfile({ userId: Auth.getProfile().userId, ...formData });
// // //     } catch (error) {
// // // // sheryl/code-work4
// // //       console.error(error.message);
// // // // =======
// // // //       console.error('There was an error updating your profile!', error);
// // // // >>>>>>> main

// //      }
// //   };

// //   // const handleDelete = async (e) => {
// //   //   try {
// //   //     const response = await deleteUser (Auth.getProfile().userId)
// //   //     console.log(response)
// //   //     Auth.logout()
// //   //   }
// //   //   catch(error) {
// //   //     console.error(error.message);
// //   //   }
// //   // }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //     <form className="profile-form" onSubmit={handleSubmit}>
// //       <div className="form-group">
// //         <label>First Name:</label>
// //         <input type="text" name="firstName" value={profileData.firstName || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Last Name:</label>
// //         <input type="text" name="lastName" value={profileData.lastName || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Email:</label>
// //         <input type="email" name="email" value={profileData.email || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Username:</label>
// // {/* // <<<<<<< feature/imon-review */}
// // //         <input type="text" name="username" value={profileData.username || ''} onChange={handleChange} />
// // {/* // ======= */}
// // //         <input type="text" name="username" value={formData.username} onChange={handleChange} />
// // {/* // >>>>>>> main */}
// //       </div>
// //       <div className="form-group">
// //         <label>Coding Languages:</label>
// //         <input type="text" name="codingLanguages" value={profileData.codingLanguages || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Meeting Preference:</label>
// // {/* // <<<<<<< feature/imon-review */}
// // //         <input type="text" name="meetingPreference" value={profileData.meetingPreference || ''} onChange={handleChange} />
// // //       </div>
// // //       <div className="form-group">
// // //         <label>Role:</label>
// // //         <select name="role" value={profileData.role || 'None'} onChange={handleChange}>
// // //           <option value="None">None</option>
// // //           <option value="Study Buddy">Study Buddy</option>
// // //           <option value="Collaborator">Collaborator</option>
// // //           <option value="Mentor">Mentor</option>
// // // =======
// // //         <select name="meetingPreference" value={formData.meetingPreference} onChange={handleChange}> 
// // //           <option value="">Select an option</option>
// // //           <option value="inPerson">In Person</option>
// // //           <option value="online">Online</option>
// // {/* // >>>>>>> main */}
// //         </select>
// //       </div>
// //       <div className="form-group">
// //         <label>Location:</label>
// //         <input type="text" name="location" value={profileData.location || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// // // <<<<<<< feature/imon-review
// // //         <label>Bio:</label>
// // //         <textarea name="bio" value={profileData.bio || ''} onChange={handleChange} />
// // //       </div>
// // //       <button type="submit">Update Profile</button>
// // //       <button type="button" onClick={handleDelete} className="delete-button">Delete Profile</button>
// // // =======
// // //         <label>Role:</label>
// // //         <select name="role" value={formData.role} onChange={handleChange}> 
// // //           <option value="">Select an option</option>
// // //           <option value="none">None</option>
// // //           <option value="observer">Observer</option>
// // //           <option value="studybuddy">Study Buddy</option>
// // //           <option value="mentor">Mentor</option>
// // //           <option value="collaborator">Collaborator</option>
// // //         </select>
// // //       </div>
// // //       <div className="form-group">
// // //         <label>Bio:</label>
// // //         <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
// // //       </div>
// // // //
// // //       <button id="submitButtonEdit" type="submitEdit">Edit Profile</button>
// // //       <button onClick={handleDelete} id="submitButtonDelete" type="submitDelete">Delete Profile</button>
// // //       /* <ul>

// // //       <button type="submit">Update Profile</button>
// // // //

// //     </form>
// //   );
// // };

// // export default Profile;

// // import React, { useState, useEffect } from 'react';
// // import { updateProfile, getUserById, deleteUser } from '../../utils/api';
// // import AuthService from '../../utils/auth';
// // import './style.css';
// // const Profile = () => {
// //   const [profileData, setProfileData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     username: '',
// //     codingLanguages: '',
// //     meetingPreference: '',
// //     role: 'None',
// //     location: '',
// //     bio: '',
// //   });
// //   const userId = AuthService.getProfile().userId;
// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const data = await getUserById(userId);
// //         setProfileData(data);
// //       } catch (error) {
// //         console.error('Error fetching profile:', error);
// //       }
// //     };
// //     fetchProfile();
// //   }, [userId]);
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfileData({ ...profileData, [name]: value });
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const updatedData = { ...profileData, userId };
// //       await updateProfile(userId, updatedData);
// //       alert('Profile updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating profile:', error);
// //       alert('There was an error updating your profile!');
// //     }
// //   };
// //   const handleDelete = async () => {
// //     if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
// //       try {
// //         await deleteUser(userId);
// //         alert('Profile deleted successfully!');
// //         AuthService.logout(); // Log the user out after deleting their profile
// //         window.location.href = '/login'; // Redirect to the login page
// //       } catch (error) {
// //         console.error('Error deleting profile:', error);
// //         alert('There was an error deleting your profile!');
// //       }
// //     }
// //   };
// //   return (
// //     <form onSubmit={handleSubmit} className="profile-form">
// //       <div className="form-group">
// //         <label>First Name:</label>
// //         <input type="text" name="firstName" value={profileData.firstName || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Last Name:</label>
// //         <input type="text" name="lastName" value={profileData.lastName || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Email:</label>
// //         <input type="email" name="email" value={profileData.email || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Username:</label>
// //         <input type="text" name="username" value={profileData.username || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Coding Languages:</label>
// //         <input type="text" name="codingLanguages" value={profileData.codingLanguages || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Meeting Preference:</label>
// //         <select name="meetingPreference" value={profileData.meetingPreference} onChange={handleChange}>
// //           <option value="inPerson">In Person</option>
// //           <option value="online">Online</option>
// //         </select>
// //       </div>
// //       <div className="form-group">
// //         <label>Role:</label>
// //         <select name="role" value={profileData.role} onChange={handleChange}>
// //           <option value="None">None</option>
// //           <option value="Study Buddy">Study Buddy</option>
// //           <option value="Collaborator">Collaborator</option>
// //           <option value="Mentor">Mentor</option>
// //         </select>
// //       </div>
// //       <div className="form-group">
// //         <label>Location:</label>
// //         <input type="text" name="location" value={profileData.location || ''} onChange={handleChange} />
// //       </div>
// //       <div className="form-group">
// //         <label>Bio:</label>
// //         <textarea name="bio" value={profileData.bio || ''} onChange={handleChange} />
// //       </div>
// //       <button type="submit">Update Profile</button>
// //       <button type="button" onClick={handleDelete} className="delete-button">Delete Profile</button>
// //     </form>
// //   );
// // };
// // export default Profile;




// >>>>>>> main
