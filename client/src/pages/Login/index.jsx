import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';
import { loginUser } from '../../utils/api';
import AuthService from '../../utils/auth';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.elements.formBasicUsername.value,
      password: e.target.elements.formBasicPassword.value,
    };

    try {
      const response = await loginUser(credentials);
      console.log('User logged in:', response);

      AuthService.login(response.token);

      navigate('/users');
    } catch (error) {
      console.error('Error logging in user:', error.message ? error.message : error);
      alert('Error logging in user: ' + (error.message ? error.message : error));
    }
  };

  return (
    <div>
      <h2>Please login to your account!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
