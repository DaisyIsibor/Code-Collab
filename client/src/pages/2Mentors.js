import React from 'react';

export default function 2Mentors() {
    const linkStyle = { border: '5px black', padding: '10px' };

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