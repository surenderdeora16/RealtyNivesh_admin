const { SushmaElementaEnquiry } = require('../../models');
const sendEmail = require('../../helpers/email');
const { generateOTP, verifyOTP } = require('../../helpers/sendSms'); 
const Otp = require('../../models/Otp');

async function getOtpStatusVerifiedAndNotRequiredCount() {
    const counts = await SushmaElementaEnquiry.countDocuments({
        otpStatus: { $in: ['otp verified', 'not required'] }
    });
    return counts;
}

exports.SushmaElementaEnquiry = async (req, res) => {
    try {
        const { action, mobile, otp } = req.body;
        let data = req.getBody(['type', 'event', 'name', 'mobile', 'email', 'city', 'message', 'siteVisitDate', 'preferredHomeSize', 'broker', 'howHeardAboutUs']);
        if (action === 'getintouch') {
            const result = await SushmaElementaEnquiry.create({ ...data, otpStatus: 'not required' });
            const Emailcount = await getOtpStatusVerifiedAndNotRequiredCount();
            await sendEmail(data, Emailcount, 'Sushma Elementa');
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
            const otpRecord = await Otp.findOne({ mobile });
            if (!otpRecord || otpRecord === null) return res.noRecords(false);

            const { valid, message } = await verifyOTP(mobile, otp);
            if (valid) {
                const enquiry = await SushmaElementaEnquiry.findOneAndUpdate(
                    { mobile },
                    { otpStatus: 'otp verified' },
                    {
                        sort: { createdAt: -1 },
                        new: true
                    }
                );
                const Emailcount = await getOtpStatusVerifiedAndNotRequiredCount();
                await sendEmail(data, Emailcount, 'Sushma Elementa');
                return res.successUpdate(enquiry);
            } else {
                return res.badRequest(message);
            }

        } else if (action === 'resendOTP') {
            const enquiry = await SushmaElementaEnquiry.findOne({ mobile: data.mobile });
            if (!enquiry) return res.noRecords('Record not found');

            const otpGenerated = await generateOTP(enquiry.mobile);

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
