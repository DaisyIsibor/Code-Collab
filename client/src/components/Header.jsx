import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import './Header.css';

const Header = ({ loggedIn, setLoggedIn }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    setLoggedIn(false);
  };

  const handleRoleFilter = (role) => {
    // Implement role filtering logic here

  };

  return (
    <header className='bg-info text-dark mb-4 py-3 display-flex align-center'>
      <div className='container flex-column justify-space-between-lg justify-center align-center text-center'>
        <Link className='text-light' to='/'>
          <h1 className='m-0' style={{ fontSize: '3rem' }}>Code Collab</h1>
        </Link>
        <p className='m-0' style={{ fontSize: '1.75rem', fontWeight: '400' }}>Find your new programming pals!</p>
        <div>
          {loggedIn ? (
            <>
            <button className='btn btn-lg btn-light m-2' onClick={logout}>Logout</button>
            <button className='btn btn-lg btn-light m-2' onClick={() => handleRoleFilter('mentor')}>Mentors</button>
              <button className='btn btn-lg btn-light m-2' onClick={() => handleRoleFilter('study buddy')}>Study Buddies</button>
              <button className='btn btn-lg btn-light m-2' onClick={() => handleRoleFilter('collaborator')}>Collaborators</button>
            </>
          ) : (
            <>
              <Link className='btn btn-lg btn-primary m-2' to='/login'>Login</Link>
              <Link className='btn btn-lg btn-light m-2' to='/signup'>Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
