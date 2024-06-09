// import React, { useState } from 'react';
// import { registerUser } from '../utils/api';

// const RegisterForm = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const userData = {
//       email: email,
//       username: username,
//       password: password
//     };

//     try {
//       const response = await registerUser(userData);
//       console.log('User registered:', response);
//     } catch (error) {
//       console.error('Error registering user:', error);
//       // Handle error, e.g., show an error message
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { registerUser } from '../utils/api';
import './style.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      email: email,
      username: username,
      password: password
    };

    try {
      const response = await registerUser(userData);
      console.log('User registered:', response);
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="signupFrm">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Sign up</h1>

        <div className="inputContainer">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="a"
            required
          />
          <label className="label">Email</label>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="a"
            required
          />
          <label className="label">Username</label>
        </div>

        <div className="inputContainer">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="a"
            required
          />
          <label className="label">Password</label>
        </div>

        <div className="inputContainer">
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="a"
            required
          />
          <label className="label">Confirm Password</label>
        </div>

        <button type="submit" className="submitBtn">Sign up</button>
      </form>
    </div>
  );
};

export default RegisterForm;
