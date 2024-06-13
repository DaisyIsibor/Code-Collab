


import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const arrowIcons = Array(10).fill().map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faArrowRight}
      className="arrow-icon"
      style={{ marginRight: '5px', fontSize: '20px', color: '#61dafbaa', fontSize: '8em', marginBottom: '20px', bottom: '10px', left: '20%' , position:'relative', marginTop:'20%' }} 
    />
  ));

  return (
    <div className="home-container">
      <h1></h1>
      <div>
        <Link to="/users" className="arrow-icons">
          {arrowIcons}
        </Link>
      </div>
    </div>
  );
}
