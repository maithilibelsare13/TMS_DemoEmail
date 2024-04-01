const db=require ('../db');
const bodyParser = require('body-parser');
const express=require('express');
const app = express();
const nodemailer = require('nodemailer');
app.use(bodyParser.json());
const expressAsyncHandler = require("express-async-handler");
const { generateOTP } = require("./otpAuth");



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aanchalmakhija242@gmail.com',
      pass: 'ekxg fars jrmq vjgr',
    },
});


const SendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const OTP = generateOTP();

  // Store OTP in the database
  const insertQuery = `INSERT INTO tms_otp (email, otp, time_stamp) VALUES (?, ?, NOW())`;
  const values = [email, OTP];
  db.query(insertQuery, values, (error, result) =>{
    if(error){
      console.log(error)
      return res.status(400).json({message : "error while inserting data"})
    }

    const mailOptions = {
        from: 'aanchalmakhija242@gmail.com',
        to: email,
        subject: 'Demo OTP',
        text: `Your OTP is : ${OTP}`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending OTP');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
  });
});

const verifyOTP = expressAsyncHandler(async (req, res) =>{
  const { email, otp } = req.body;

  // Retrieve OTP from the database
  const selectQuery = `SELECT otp FROM tms_otp WHERE email = ? AND time_stamp >= NOW() - INTERVAL 1 MINUTE`;
  const deleteQuery = `DELETE FROM tms_otp WHERE email = ?`;
  const values = [email];
  db.query(selectQuery, values, (error, result) => {
    if(error){
      console.log(error)
      return res.status(400).json({message : "error while inserting data"})
    }
    if (result.length > 0 && result[0].otp === otp) {
      console.log(result);
        db.query(deleteQuery, values, (deleteError, deleteResult) => {
          if(deleteError){
            return res.status(400).json({message : "error while deleting entry"});
          }
          res.status(200).json({message : "otp validated and deleted successfully"});
        })
    } 
    else {
        res.status(400).json({message : 'Invalid OTP'});
    }
  });
});


module.exports = {
  SendEmail,
  verifyOTP,
};