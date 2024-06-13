


import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getChatMessages } from '../../utils/api';
import './Chat.css';
const socket = io('http://localhost:5051', {
  withCredentials: true,
});
const Chat = ({ userId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    // Fetch chat history
    const fetchMessages = async () => {
      try {
        const response = await getChatMessages(userId, recipientId);
        setMessages(response);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };
    fetchMessages();
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    socket.on('receiveMessage', handleReceiveMessage);
    socket.emit('joinRoom', { userId, recipientId });
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.emit('leaveRoom', { userId, recipientId });
    };
  }, [userId, recipientId]);
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = { sender: userId, recipient: recipientId, message: newMessage.trim() };
      socket.emit('sendMessage', messageData); // Emit the message to the server
      setNewMessage(''); // Clear the input field immediately
    }
  };
  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === userId ? 'message-sent' : 'message-received'}>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};
export default Chat;