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
//         <Form.Label>Large file input example</Form.Label>
//         <Form.Control type="file" size="lg" />
//       </Form.Group>
//     </Form>
//     {/* </> */}
//     </div>
//   );
// }
import Auth from '../../utils/auth.js';
import React, { useState, useEffect } from 'react';
import { updateProfile, getUserById } from '../../utils/api.js';
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

  // useEffect hook to fetch user data and pre-set form data with the response
  useEffect(() => {
    // Get user data and update state
    // Define by user id and then send data to it 
    getUserById (Auth.getProfile().userId).then(data => {
      console.log(data)
      setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email, 
      username: data.username,
      codingLanguages: data.codingLanguages,
      meetingPreference: data.meetingPreference,
      role: data.role,
      location: data.location,
      bio: data.bio,
       })
    })
    // Empty dependency array so that useEffect only runs once 
}, [])

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
      const response = await updateProfile ({userId:Auth.getProfile().userId, ...formData})
    } catch (error) {
      console.error('There was an error creating your profile!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      <div>
        <label>Coding Languages:</label>
        <input type="text" name="codingLanguages" value={formData.codingLanguages} onChange={handleChange} />
      </div>
      <div>
        <label>Meeting Preference:</label>
        <select name="meetingPreference" id="meetingPreference" value={formData.meetingPreference} onChange={handleChange}> 
          <option value="" disabled>Select an option</option>
          <option value="inPerson">In Person</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </div>
      {/* <div>
        <label>Role:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} />
      </div> */}
      <label>Role:</label>
        <select name="role" id="role" value={formData.role} onChange={handleChange}> 
          <option value="" disabled>Select an option</option>
          <option value="none">None</option>
          <option value="observer">Observer</option>
          <option value="studybuddy">Study Buddy</option>
          <option value="mentor">Mentor</option>
          <option value="collaborator">Collaborator</option>
        </select>
      <div>
        <label>Bio:</label>
        <textarea type="text" name="bio" value={formData.bio} onChange={handleChange} ></textarea>
      </div>
      </div>
      <button id="submitButton" type="submit">Update Profile</button>
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






// function FormExample() {
//   const { Formik } = formik;

//   const schema = yup.object().shape({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     username: yup.string().required(),
//     email: yup.string().required(),
//     password: yup.string().required(),
//     codingLanguages: yup.string().required(),
//     meetingPreferences: yup.string().required(),
//     file: yup.mixed().required(),
//     terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
//   });
