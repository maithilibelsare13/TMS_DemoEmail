const db=require ('../db');
// const dotenv = require('');
const bodyParser = require('body-parser');
const express=require('express');
const app = express();
const nodemailer = require('nodemailer');
app.use(bodyParser.json());
const expressAsyncHandler = require("express-async-handler");
const GenerateOTP = require("./GenerateOTP");



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aanchalmakhija242@gmail.com',
      pass: 'ekxg fars jrmq vjgr',
    },
  });


const SendEmail = expressAsyncHandler( async ( req , res) => {
    const { email } = req.body;
    console.log(email);

    const OTP = generateOTP();

const mailOptions = {
    from: 'aanchalmakhija242@gmail.com',
    to: email ,
    subject: 'Demo OTP',
    text : 'Your OTP is : ${OTP}',
    // html: inlinedEmail // Send the inlined HTML content as HTML in the email
  };

  transporter.sendEmail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
})

  module.exports = {
    SendEmail
  };