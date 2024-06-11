import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const emailController = {};

emailController.sendMessage = async (req, res) => {
  const { senderEmail, recipientEmail, message } = req.body;

  if (!senderEmail || !recipientEmail || !message) {
    console.error('Both sender and recipient emails are required', req.body);
    return res.status(400).json({ message: 'Bad Request: Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: `postmaster@${process.env.MAILGUN_DOMAIN}`,
      pass: process.env.MAILGUN_API_KEY,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: 'New Message from Code Collab',
    text: message,
    html: `<p>${message}</p>`,
  };

  console.log('Sending email with data:', mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};

export default emailController;