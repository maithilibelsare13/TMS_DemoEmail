const express = require('express');
const router = express.Router();
const emailAuth = require('./auth/emailAuth');



router.post('/SendEmail' , emailAuth.SendEmail);
router.post('/verifyOTP' , emailAuth.verifyOTP);


module.exports = router;