import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const MessageForm = ({ show, handleClose, senderEmail, recipientEmail }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Sender Email:', senderEmail);
    console.log('Recipient Email:', recipientEmail);
  }, [senderEmail, recipientEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailData = {
      senderEmail,
      recipientEmail,
      message,
    };

    console.log('Sending email with data:', emailData);

    try {
      const response = await axios.post('http://localhost:5051/api/sendMessage', emailData);
      console.log('Message sent:', response.data);
      alert('Message sent successfully');
      handleClose();
    } catch (error) {
      console.error('Failed to send message', error);
      alert('Failed to send message: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="messageForm.Message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MessageForm;
