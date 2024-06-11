// server/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (senderEmail, recipientEmail, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email provider
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: 'New Message from Code Collab',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = sendEmail;
