import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import './Header.css';

const Header = ({ loggedIn, setLoggedIn, handleRoleFilter }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    setLoggedIn(false);
  };

  return (
    <header className='header-container bg-info text-dark mb-4 py-3 display-flex align-center'>
      <div className='container flex-column justify-space-between-lg justify-center align-center text-center'>
        <Link className='text-light' to='/'>
          <h1 className='m-0' style={{ fontSize: '3rem' }}>Code Collab Connect</h1>
        </Link>
        <p className='m-0' style={{ fontSize: '1.75rem', fontWeight: '400' }}>Find your new programming pals!</p>
        {loggedIn ? (
          <>
            <div className='button-container'>
              <button className='btn btn-lg btn-light m-2' onClick={() => handleRoleFilter('Mentor')}>Mentors</button>
              <button className='btn btn-lg btn-light m-2' onClick={() => handleRoleFilter('Study Buddy')}>Study Buddies</button>
              <button className='btn btn-lg btn-light m-2' onClick={() => handleRoleFilter('Collaborator')}>Collaborators</button>
            </div>
            <button className='btn btn-logout' onClick={logout}>Logout</button>
          </>
        ) : (
          <div className='button-container'>
            <Link className='btn btn-lg btn-primary m-2' to='/login'>Login</Link>
            {/* <Link className='btn btn-lg btn-light m-2' to='/signup'>Signup</Link> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;