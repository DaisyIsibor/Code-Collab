import React from 'react';
import { useState } from 'react';

export default function Mentors() {
    const linkStyle = { border: '5px black', padding: '10px' };
    const [role, setRole] = useState('all')
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
            {/* Need to work on these anchor tags and change them to links instead */}
            {/* Using the React router DOM for internal links  */}
            <div style={linkStyle}>
                <a href='#'>Mentors</a>
            </div>
            <div style={linkStyle}>
                <a href='#'>Collaborators</a>
            </div>
            <div style={linkStyle}>
                <a href='#'>Study Buddy</a>
            </div>
            </section>
        </nav>
    )
}

// Component library or CSS library for styling --> Basic = Bootstrap combined with React Bootstrap 