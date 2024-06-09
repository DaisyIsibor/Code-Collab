import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 

const Mentors = () => {
  const linkStyle = { border: '5px black', padding: '10px' };
  const [role, setRole] = useState('all');

  return (
    <nav className='main-header-menu'>
      <section
        style={{
          display: 'flex',
          fontFamily: 'helvetica',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <div style={linkStyle}>
          <Link to='/mentors'>Mentors</Link>
        </div>
        <div style={linkStyle}>
          <Link to='/collaborators'>Collaborators</Link>
        </div>
        <div style={linkStyle}>
          <Link to='/study-buddy'>Study Buddy</Link>
        </div>
      </section>
    </nav>
  );
};

export default Mentors;
