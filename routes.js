const express = require('express');
const router = express.Router();
const SendEmail = require('./auth/SendEmail');



router.post("/SendEmail" , SendEmail.SendEmail);

module.exports = router;