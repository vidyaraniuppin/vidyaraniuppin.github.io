const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Replace with your own Gmail and App Password
const EMAIL_USER = 'vidyaraniuppin1992@gmail.com';
const EMAIL_PASS = 'jjmdibwzawgqefzr'; // create at https://myaccount.google.com/apppasswords

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve your HTML

// POST endpoint to receive form data and send email
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Email error:', err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
