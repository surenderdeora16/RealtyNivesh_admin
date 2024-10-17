// services/otpService.js
const axios = require("axios");
const Otp = require("../models/Otp");

const generateOTP = async (mobile) => {
    console.log("PLEASWEW  IIINN")
    try {
        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        const apiKey = process.env.TEXTLOCALKEY;
        const address = process.env.TEXTLOCALURL;
        const sender = process.env.TEXTLOCALSENDERID;
        const message = encodeURIComponent(`Hello User Your Login Verification Code is ${otpCode}. Thanks AYT`);
        const url = `${address}?apikey=${apiKey}&numbers=${mobile}&message=${message}&sender=${sender}`;

        await Otp.findOneAndUpdate(
            { mobile: mobile },
            { otp: otpCode, createdAt: new Date() },
            { upsert: true, new: true }
        );
        const { data } = await axios.get(url);
        if (data && data.status == 'success') {
            return true;
        } else {
            throw false
        }
    } catch (error) {
        console.error("Error generating OTP:", error);
        return null;
    }
};

const verifyOTP = async (mobile, otpCode) => {
    console.log('PLSEAE GO')
    try {
        const otpRecord = await Otp.findOne({ mobile: mobile });

        if (!otpRecord) {
            return { valid: false, message: 'No OTP found for this mobile number' };
        }

        if (otpRecord.otp === otpCode) {
            return { valid: true, message: 'OTP Verified' };
        } else {
            return { valid: false, message: {message: 'Invalid OTP'} };
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { valid: false, message: 'Error verifying OTP' };
    }
};

module.exports = { generateOTP, verifyOTP }; 
