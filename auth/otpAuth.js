const OTPGenerator = require("otp-generator");

function generateOTP () {
    const OTP = OTPGenerator.generate(4, {
        upperCaseAlphabets : true ,
        specialChars : false
    });

    return OTP;
}



module.exports = {
    generateOTP
};