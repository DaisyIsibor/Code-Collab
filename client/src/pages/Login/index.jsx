import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';
import { loginUser } from '../../utils/api';
import AuthService from '../../utils/auth';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // Handled form submission for logging in the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.elements.formBasicUsername.value,
      password: e.target.elements.formBasicPassword.value,
    };

    try {
      // Sent login request with user credentials
      const response = await loginUser(credentials);
      console.log('User logged in:', response);

      // Logged in the user by storing the token
      AuthService.login(response.token);

      // Redirected to the /users page
      navigate('/users');
    } catch (error) {
      console.error('Error logging in user:', error.message ? error.message : error);
      alert('Error logging in user: ' + (error.message ? error.message : error));
    }
  };


return (
  <div className="loginFrm">
    <Form onSubmit={handleSubmit} className="form">

      <h2 className="title">Login</h2>

      <div className="inputContainer">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          
          <Form.Control type="text" placeholder="Enter username" className="form-control" required />
          <Form.Label className="label">Username</Form.Label>
        </Form.Group>
      </div>

      <div className="inputContainer">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" className="form-control" required />
          <Form.Label className="label">Password</Form.Label>
        </Form.Group>
      </div>

      <Button variant="primary" type="submit" className="btn-primary">
        Submit
      </Button>

      <div className="signup-link">
          <p>Don't have an account? <Link to="/Signup">Sign up</Link></p>
        </div>


    </Form>
  </div>
);
}