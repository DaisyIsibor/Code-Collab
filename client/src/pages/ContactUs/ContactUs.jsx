import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form data submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <div className="collaborators">
        <h3>Made by Code Collaborators</h3>
        <ul>
          <li>
            <a href="https://github.com/imooon" target="_blank" rel="noopener noreferrer">Imon Nidharia</a>
          </li>
          <li>
            <a href="https://github.com/DaisyIsibor" target="_blank" rel="noopener noreferrer">Daisy Isibor</a>
          </li>
          <li>
            <a href="https://github.com/slawcode" target="_blank" rel="noopener noreferrer">Sheryl Lawrence</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
