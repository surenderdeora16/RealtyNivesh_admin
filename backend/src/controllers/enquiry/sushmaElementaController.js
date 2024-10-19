const { SushmaElementaEnquiry } = require('../../models');
const sendEmail = require('../../helpers/email');
const { generateOTP, verifyOTP } = require('../../helpers/sendSms'); // Services updated for better structure
const Otp = require('../../models/Otp');

exports.SushmaElementaEnquiry = async (req, res) => {
    try {
        const { action, mobile, otp } = req.body;
        let data = req.getBody(['type', 'event', 'name', 'mobile', 'email', 'city', 'message', 'siteVisitDate', 'preferredHomeSize', 'broker', 'howHeardAboutUs']);
        if (action === 'getintouch') {
            const result = await SushmaElementaEnquiry.create({ ...data, otpStatus: 'not required' });
            await sendEmail(data);
            return res.successInsert(result);

        } else if (action === 'submitForm') {
            const result = await SushmaElementaEnquiry.create({ ...data, otpStatus: 'otp not verified' });
            const otpGenerated = await generateOTP(result.mobile);
            if (otpGenerated) {
                return res.successInsert({ result, message: 'OTP sent to mobile' });
            } else {
                return res.someThingWentWrong('Failed to send OTP');
            }

        } else if (action === 'verifyOTP') {
            console.log("verfu ot commig...")
            const otpRecord = await Otp.findOne({ mobile });
            console.log("otpRecord", otpRecord)
            if (!otpRecord || otpRecord === null) return res.noRecords(false);

            const { valid, message } = await verifyOTP(mobile, otp);
            console.log('message', message)
            console.log('valid', valid)
            if (valid) {
                const enquiry = await SushmaElementaEnquiry.findOneAndUpdate(
                    { mobile }, 
                    { otpStatus: 'otp verified' },
                    { 
                        sort: { createdAt: -1 }, 
                        new: true 
                    }
                );
                console.log('enquiryCheckL', enquiry)
                await sendEmail(data);
                return res.successUpdate(enquiry);
            } else {
                return res.badRequest(message);
            }

        } else if (action === 'resendOTP') {
            const enquiry = await SushmaElementaEnquiry.findOne({ mobile: data.mobile });
            if (!enquiry) return res.noRecords('Record not found');

            const otpGenerated = await generateOTP(enquiry.mobile);
            console.log(otpGenerated, "test 34")
            if (otpGenerated) {
                return res.success({ message: 'OTP resent successfully' });
            } else {
                return res.someThingWentWrong('Failed to resend OTP');
            }

        } else {
            return res.badRequest('Invalid action');
        }
    } catch (error) {
        return res.someThingWentWrong(error.message);
    }
};
