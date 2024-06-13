import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/contact-us" className="footer-button">Contact Us</Link>
        <p className="rights-reserved">© 2024 Code Collab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
