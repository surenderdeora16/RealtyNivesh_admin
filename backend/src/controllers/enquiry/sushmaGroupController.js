const { SushmaGroupEnquiry } = require('../../models');
const sendEmail = require('../../helpers/email');
const { generateOTP, verifyOTP } = require('../../helpers/sendSms'); // Services updated for better structure
const Otp = require('../../models/Otp');

exports.SushmaGroupEnquiry = async (req, res) => {
    try {
        const { action, mobile, otp } = req.body;
        let data = req.getBody(['type', 'event', 'name', 'mobile', 'email', 'message', 'siteVisitDate', 'projectName']);
        if (action === 'getintouch') {
            const result = await SushmaGroupEnquiry.create({ ...data, otpStatus: 'not required' });
            await sendEmail(data, 'Sushma Group');
            return res.successInsert(result);

        } else if (action === 'submitForm') {
            try {
                const result = await SushmaGroupEnquiry.create({ ...data, otpStatus: 'otp not verified' });
                const otpGenerated = await generateOTP(result.mobile);
                console.log(otpGenerated, "test123")  
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
            if (!otpRecord || otpRecord === null) return res.noRecords(false);

            const { valid, message } = await verifyOTP(mobile, otp);
       
            if (valid) {
                const enquiry = await SushmaGroupEnquiry.findOneAndUpdate(
                    { mobile },
                    { otpStatus: 'otp verified' },
                    {
                        sort: { createdAt: -1 },
                        new: true
                    }
                );
                await sendEmail(data, 'Sushma Group');
                return res.successUpdate(enquiry);
            } else {
                return res.badRequest(message);
            }

        } else if (action === 'resendOTP') {
            try {
                const enquiry = await SushmaGroupEnquiry.findOne({ mobile: data.mobile });
                if (!enquiry) return res.noRecords('Record not found');

                if (enquiry?.otpStatus !== 'otp verified') {
                    const otpGenerated = await generateOTP(enquiry.mobile);
                    console.log(otpGenerated, "otpGenerated"); 
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
