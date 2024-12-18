const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.google.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const fromOptions = {
  address: process.env.EMAIL_USER,
  name: 'Exams Appointments'
};

const sendEmail = (options) => {
  options.from = fromOptions;
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = sendEmail;
