// services/otpService.js
const axios = require("axios");
const Otp = require("../models/Otp");

const generateOTP = async (mobile) => {
    console.log("PLEASWEW  IIINN")
    try {
        console.log("1")
        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        console.log("2")
        const apiKey = process.env.TEXTLOCALKEY;
        console.log("3")
        const address = process.env.TEXTLOCALURL;
        console.log("4")
        const sender = process.env.TEXTLOCALSENDERID;
        console.log("5")
        const message = encodeURIComponent(`Hello User Your Login Verification Code is ${otpCode}. Thanks AYT`);
        console.log("6")
        const url = `${address}?apikey=${apiKey}&numbers=${mobile}&message=${message}&sender=${sender}`;
        console.log("7")

        await Otp.findOneAndUpdate(
            { mobile: mobile },
            { otp: otpCode, createdAt: new Date() },
            { upsert: true, new: true }
        );
        console.log("8")
        const { data } = await axios.get(url);
        console.log("9")
        if (data && data.status == 'success') {
        console.log("10")
            return true;
        } else {
        console.log("11")
            throw false
        }
        console.log("12")
    } catch (error) {
        console.log("13")
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
