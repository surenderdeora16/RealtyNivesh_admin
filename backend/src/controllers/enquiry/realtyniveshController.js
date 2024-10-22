const sendEmail = require('../../helpers/email');
const { generateOTP, verifyOTP } = require('../../helpers/sendSms'); // Services updated for better structure
const Otp = require('../../models/Otp');

exports.RealtyNiveshEnquiry = async (req, res) => {
    try {
        const { action, mobile, otp } = req.body;
        let data = req.getBody(['type', 'event', 'name', 'mobile', 'email', 'city', 'message', 'projectName', 'siteVisitDate', 'preferredHomeSize', 'broker', 'howHeardAboutUs']);

        if (action === 'getintouch') {
            const result = await sendEmail(data, 'Realty Nivesh');
            return res.successInsert(result);

        } else if (action === 'submitForm') {
            const otpGenerated = await generateOTP(data.mobile);
            if (otpGenerated) {
                return res.successInsert({ message: 'OTP sent to mobile' });
            } else {
                return res.someThingWentWrong('Failed to send OTP');
            }

        } else if (action === 'verifyOTP') {
            const otpRecord = await Otp.findOne({ mobile });
            if (!otpRecord || otpRecord === null) return res.noRecords(false);
            const { valid, message } = await verifyOTP(mobile, otp);

            if (valid) {
                const enquiry = await sendEmail(data, 'Realty Nivesh');
                return res.successUpdate(enquiry);
            } else {
                return res.badRequest(message);
            }

        } else if (action === 'resendOTP') {
            const otpGenerated = await generateOTP(data.mobile);

            if (otpGenerated) {
                return res.status(200).json({
                    status: true,
                    message: 'New OTP sent to your mobile no.'
                });
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
