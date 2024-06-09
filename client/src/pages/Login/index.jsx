// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import './style.css'

// export default function Login() {
//   return (
//     <div>
//         <h2> Please login to your account! </h2>
//     <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//     </div>
//   );
// }


import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './style.css'; // Import your custom CSS

export default function Login() {
  return (
    <div className="loginFrm">
      <Form className="form">
        <h1 className="title">Login</h1>

        <div className="inputContainer">
          <Form.Control
            type="email"
            placeholder=""
            className="form-control"
            required
          />
          <Form.Label className="label">Email address</Form.Label>
        </div>

        <div className="inputContainer">
          <Form.Control
            type="password"
            placeholder=""
            className="form-control"
            required
          />
          <Form.Label className="label">Password</Form.Label>
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
