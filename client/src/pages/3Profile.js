// import React from 'react';

// Should this be in an index.jsx file?
// Mod 20 / Activity 15
import { useState } from 'react';

function Form() { // In App.jsx - we are setting two state variables for firstName and lastName using 'useState'
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
}


//Mod 20/ Activity 23
import { Link } from 'react-router-dom';
import Auth from '../..utils/auth'; // Depends on our set up

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout(); // This is in the utils.js file under utils folder in this specific example but depends on our set up 
    };
    return(
        <header className='bg-info text-dark mb-4 py-3 display-flex align-center'>
            <div className='container flex-column justify-space-between-lg justify-center align-center text-center'>
                <Link className='text-dark' to='/'>
                    <h1 className='m-0' style={{ fontSize:'3rem' }}>Code Collab</h1>
                </Link>
                <p className='m-0' styles={{ fontSize: '1.75rem', fontWeight: '400' }}> Find your new programming pals! </p>
                <div>
                    {Auth.loggedIn() ? (
                        <button className='btn btn-lg btn-light m-2' onClick={logout}>Logout</button>
                    ) : ( 
                    <>
                    <Link className='btn btn-lg btn-primary m-2' to='/login'>Login</Link>
                    <Link className='btn btn-lg btn-light m-e' to='/signup'>Signup</Link>
                    </>
                    )}
                </div>
            </div>
        </header>
    );
};