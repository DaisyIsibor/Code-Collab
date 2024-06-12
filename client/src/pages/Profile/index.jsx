//
// This is commented out
// import Form from 'react-bootstrap/Form';

// export default function Profile() {
//   return (
//     <div>
//         <h2>Create your Profile!</h2>
//         <h3>Please fill out the fields below to create your profile</h3>
//     <Form>
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Label>Default file input example</Form.Label>
//         <Form.Control type="file" />
//       </Form.Group>
//       <Form.Group controlId="formFileSm" className="mb-3">
//         <Form.Label>Small file input example</Form.Label>
//         <Form.Control type="file" size="sm" />
//       </Form.Group>
//       <Form.Group controlId="formFileLg" className="mb-3">
//         <Form.Label>Large file input example</Form.Label>this is my first signup. i love coding and would like to know more about it  
//         <Form.Control type="file" size="lg" />
//       </Form.Group>
//     </Form>
//     {/* </> */}
//     </div>
//   );
// }




// >>>>>>> main
import Auth from '../../utils/auth.js';
import React, { useState, useEffect } from 'react';
import { updateProfile, getUserById, deleteUser } from '../../utils/api.js';
import './style.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', 
    username: '',
    codingLanguages: '',
    meetingPreference: '',
    role: '',
    location: '',
    bio:'',
  });

  // useEffect hook to fetch user data and pre-set form data 
  useEffect(() => {
    // Get user data and update state
    // Define by user id and then send data to it 
    getUserById (Auth.getProfile().userId).then(data => {
      console.log(data)
      setFormData({
        ...formData,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email, 
        username: data.username,
        codingLanguages: data.codingLanguages,
        meetingPreference: data.meetingPreference,
        role: data.role,
        location: data.location,
        bio: data.bio,
      });
    });
    // Empty dependency array so that useEffect only runs once 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target; //destructuring to extract name and value properties from the event's target (the input element)
    setFormData({ 
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({ userId: Auth.getProfile().userId, ...formData });
    } catch (error) {
// sheryl/code-work4
      console.error(error.message);
// =======
//       console.error('There was an error updating your profile!', error);
// >>>>>>> main
    }
  };

  const handleDelete = async (e) => {
    try {
      const response = await deleteUser (Auth.getProfile().userId)
      console.log(response)
      Auth.logout()
    }
    catch(error) {
      console.error(error.message);
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Coding Languages:</label>
        <input type="text" name="codingLanguages" value={formData.codingLanguages} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Meeting Preference:</label>
        <select name="meetingPreference" value={formData.meetingPreference} onChange={handleChange}> 
          <option value="">Select an option</option>
          <option value="inPerson">In Person</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}> 
          <option value="">Select an option</option>
          <option value="none">None</option>
          <option value="observer">Observer</option>
          <option value="studybuddy">Study Buddy</option>
          <option value="mentor">Mentor</option>
          <option value="collaborator">Collaborator</option>
        </select>
      </div>
      <div className="form-group">
        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
      </div>
//
      <button id="submitButtonEdit" type="submitEdit">Edit Profile</button>
      <button onClick={handleDelete} id="submitButtonDelete" type="submitDelete">Delete Profile</button>
      {/* <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} <button onClick={() => deleteUser(user.id)}>Delete Profile</button>
          </li>
        ))}
      </ul> */}
=======
      <button type="submit">Update Profile</button>
//
    </form>
  );
};

export default Profile;




//   const ProfileCreation = () => {
//     return [formData, setForData] =
//     useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         username: '',
//         password: '',
//         codingLanguages: '',
//         meetingPreference: '',
//         role: ''
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
//     const handleInputSubmit = (e) => {
//         e.preventDefault();
//         console.log('Profile changes submitted:', formData);
//     };
//     return (
//         <div>
//             <h4>Create Profile</h4>
//             <form onSubmit={handleSubmit}></form> 
//                 <div>
//                     <label>First name:</label>
//                     <input
//                         type="text"
//                         firstname="firstname"
//                         value={formData.firstname}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>First name:</label>
//                     <input
//                         type="text"
//                         lastname="lastname"
//                         value={formData.lastname}
//                         onChange={handleChange}
//                     />
//                 </div>
//             );
//   };

// };



// In server.js

// let profiles = [];

// app.post('/profiles', (req, res) => {
//     const { firstname, lastname, email, username, password,bio, codingLanguages, meetingPreference, connectionHistory, reviews, role } = req.body;
// const profileData = { id: profiles.length + 1, firstname, lastname, email, username, password,bio, codingLanguages, meetingPreference, connectionHistory, reviews, role };
// profiles.push(profileData);
// });


// app.get('/profiles', (req, res) => {
//  res.json(profiles);
// });


