// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve index.html & thank-you.html

// POST route to handle form submissions
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vidyaraniuppin1992@gmail.com',           // ✅ your email
      pass: 'your_app_password'               // ✅ use an App Password (not your real Gmail password)
    }
  });

  const mailOptions = {
    from: email,
    to: 'your_email@gmail.com',              // ✅ destination email (same or different from above)
    subject: `Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true }); // frontend will handle redirection
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false });
  }
});

// Fallback for SPA routing or refresh
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
