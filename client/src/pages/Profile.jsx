// import a form component 

// Mod 20 / Activity 15
// import { useState } from 'react';

// function Profile() { // In App.jsx - we are setting two state variables for firstName and lastName using 'useState'
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     return (<div>Profile</div>)
// }

// export default Profile

//Mod 20/ Activity 23

import Form from 'react-bootstrap/Form';

export default function Profile() {
  return (
    <div>
        <h2>Create your Profile</h2>
        <h3>Please fill out the fields below to create your profile</h3>
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <Form.Group controlId="formFileDisabled" className="mb-3">
        <Form.Label>Disabled file input example</Form.Label>
        <Form.Control type="file" disabled />
      </Form.Group>
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

// export default FormFileExample;
//     );
// }