// import React from 'react';

// export default function Home() {
//     return (<div>Home</div>)
// }

// Need components for login but using a modal so no need for routing --> Popup for login will be on this page 
// Basic modal in Material UI
// Challenge 21 


import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      Home
      <div>
        <Link to="/users">Go to Users Page</Link>
      </div>
    </div>
  );
}