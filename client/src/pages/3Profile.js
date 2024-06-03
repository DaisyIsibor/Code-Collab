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
            <div className='container flex-column justify-content '
        </header>
    )
}