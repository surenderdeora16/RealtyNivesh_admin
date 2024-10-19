// models/SushmaElementaEnquiry.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    type: { type: Number, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    action: { type: String, required: false },
    city: { type: String },
    message: { type: String },
    siteVisitDate: { type: Date, default: null },
    preferredHomeSize: { type: String },
    broker: { type: String },
    howHeardAboutUs: { type: String },
    event: { type: String, required: true },
    otpStatus: { type: String, default: 'OTP Not Verified' },
    googleSheetStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SushmaElementa_Enquiry', enquirySchema);
