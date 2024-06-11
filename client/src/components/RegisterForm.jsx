import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import AuthService from '../utils/auth';
import './style.css';

const RegisterForm = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formState);
      console.log('User registered:', response);
      AuthService.login(response.token);
      navigate('/users');
    } catch (error) {
      console.error('Error registering user:', error.message ? error.message : error);
      alert('Error registering user: ' + (error.message ? error.message : error));
    }
  };

  return (
    <div className="signupFrm">
    <form onSubmit={handleSubmit} className="form">
    <h1 class="title">Sign up</h1>

      <div className="inputContainer">
        
        <input
        className="input"
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          required
        />
        <label className="label">Username:</label>
      </div>

      <div className="inputContainer">
        <input
        className="input"
          type="email"
          
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <label className="label">Email</label>

      </div>

      <div className="inputContainer">
        <input
          type="password"
          className="input"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <label className="label">Password</label>
      </div>

      <button type="submit" className="submitBtn">Sign up</button>
    </form>
    </div>
  );
};

export default RegisterForm;
