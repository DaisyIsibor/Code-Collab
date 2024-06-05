// import a form component 


// Mod 20 / Activity 15
import { useState } from 'react';

function Profile() { // In App.jsx - we are setting two state variables for firstName and lastName using 'useState'
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    return (<div>Profile</div>)
}

export default Profile

//Mod 20/ Activity 23

// Form from React Bootstrap
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function BasicExample() {
//   return (
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
//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="Check me out" />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default BasicExample;

