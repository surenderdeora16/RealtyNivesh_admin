const { SushmaGroupEnquiry } = require('../../models');
const sendEmail = require('../../helpers/email');
const { generateOTP, verifyOTP } = require('../../helpers/sendSms'); // Services updated for better structure
const Otp = require('../../models/Otp');

exports.SushmaGroupEnquiry = async (req, res) => {
    try {
        const { action, mobile, otp } = req.body;
        let data = req.getBody(['type', 'event', 'name', 'mobile', 'email', 'message', 'siteVisitDate', 'projectName']);
        console.log('dataBoduy', data)
        if (action === 'getintouch') {
            const result = await SushmaGroupEnquiry.create({ ...data, otpStatus: 'not required' });
            // await sendEmail(data);
            return res.successInsert(result);

        } else if (action === 'submitForm') {
            try {
                console.log("OK....")
                console.log("Creating enquiry with data:", { ...data, otpStatus: 'otp not verified' }); // Log the data being inserted
                const result = await SushmaGroupEnquiry.create({ ...data, otpStatus: 'otp not verified' });
                console.log('Result of create operation:', result);
                const otpGenerated = await generateOTP(result.mobile);
                if (otpGenerated) {
                    return res.successInsert({ result, message: 'OTP sent to mobile' });
                } else {
                    return res.someThingWentWrong('Failed to send OTP');
                }
            }
            catch (error) {
                console.log('errors', error)
            }
        } else if (action === 'verifyOTP') {
            const otpRecord = await Otp.findOne({ mobile });
            if (!otpRecord) return res.noRecords(false);

            const { valid, message } = await verifyOTP(mobile, otp);
            console.log('message', message)
            console.log('valid', valid)
            if (valid) {
                const enquiry = await SushmaGroupEnquiry.findOneAndUpdate(
                    { mobile },
                    { otpStatus: 'otp verified' },
                    {
                        sort: { createdAt: -1 },
                        new: true
                    }
                );

                console.log('enquiryxcheckOTP', enquiry)
                // await sendEmail(data);
                return res.successUpdate(enquiry);
            } else {
                return res.badRequest(message);
            }

        } else if (action === 'resendOTP') {
            console.log("OKKKKKKKKKkk")
            try {
                const enquiry = await SushmaGroupEnquiry.findOne({ mobile: data.mobile });
                if (!enquiry) return res.noRecords('Record not found');
                console.log('enquiryResend', enquiry)

                if (enquiry?.otpStatus !== 'otp verified') {
                    const otpGenerated = await generateOTP(enquiry.mobile);
                    if (otpGenerated) {
                        return res.success({ message: 'OTP resent successfully' });
                    } else {
                        return res.someThingWentWrong('Failed to resend OTP');
                    }
                } else {
                    return res.badRequest('OTP has already been verified for this number.');
                }
            }
            catch (error) {
                console.log("ERROR", error)
            }
        } else {
            return res.badRequest('Invalid action');
        }
    } catch (error) {
        return res.someThingWentWrong(error.message);
    }
};
