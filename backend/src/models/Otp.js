// models/Otp.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobile: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expires: '5m', default: Date.now }, // OTP expires after 5 minutes
});

module.exports = mongoose.model('Otp', otpSchema);
