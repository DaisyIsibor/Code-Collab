import Form from 'react-bootstrap/Form';
// import './style.css'
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import * as formik from 'formik';
// import * as yup from 'yup';

export default function Profile() {
  return (
    <div>
        <h2>Create your Profile!</h2>
        <h3>Please fill out the fields below to create your profile</h3>
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      {/* <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple /> */}
      {/* </Form.Group> */}
      {/* <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Disabled file input example</Form.Label>
        <Form.Control type="file" disabled />
      </Form.Group> */}
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>Small file input example</Form.Label>
        <Form.Control type="file" size="sm" />
      </Form.Group>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Large file input example</Form.Label>
        <Form.Control type="file" size="lg" />
      </Form.Group>
    </Form>
    {/* </> */}
    </div>
  );
}
  
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

// MODULE 22 / ACTIVITY 25

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
