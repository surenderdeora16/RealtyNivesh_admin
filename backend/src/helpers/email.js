const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "surender82905@gmail.com",
            pass: "oczbbjpmhfknmmnh"
        }
    });

    const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sushma Elementa Enquiry</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                width: 100%;
                border: 1px solid #e0e0e0;
            }
            h1 {
                color: #37493c;
                font-size: 26px;
                border-bottom: 2px solid #37493c;
                padding-bottom: 10px;
            }
            p {
                margin: 0 0 10px;
                line-height: 1.6;
                color: #333;
            }
            .footer {
                margin-top: 30px;
                font-size: 0.9em;
                color: #777;
                text-align: center;
            }
            .highlight {
                background-color: #e9f5e9;
                padding: 15px;
                border-left: 5px solid #37493c;
                margin: 20px 0;
            }
            .label {
                font-weight: bold;
                color: #37493c;
            }
            @media (max-width: 600px) {
                .container {
                    padding: 20px;
                }
                h1 {
                    font-size: 22px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New Lead For Sushma Elementa</h1>
            ${data?.name ? `<p><span class="label">Name:</span> ${data.name}</p>` : ''}
            ${data?.mobile ? `<p><span class="label">Contact:</span> ${data.mobile}</p>` : ''}
            ${data?.email ? `<p><span class="label">Email:</span> ${data.email}</p>` : ''}
            ${data?.city ? `<p><span class="label">City:</span> ${data.city}</p>` : ''}
            ${data?.message || data?.siteVisitDate || data?.preferredHomeSize || data?.broker || data?.howHeardAboutUs ? `
                    <div class="highlight">
                        ${data?.message ? `<p><span class="label">Message:</span> ${data.message}</p>` : ''}
                        ${data?.siteVisitDate ? `<p><span class="label">Site Visit Date:</span> ${data.siteVisitDate}</p>` : ''}
                        ${data?.preferredHomeSize ? `<p><span class="label">Preferred Home Size:</span> ${data.preferredHomeSize}</p>` : ''}
                        ${data?.broker ? `<p><span class="label">Broker:</span> ${data.broker}</p>` : ''}
                        ${data?.howHeardAboutUs ? `<p><span class="label">How Heard About Us:</span> ${data.howHeardAboutUs}</p>` : ''}
                    </div>
                ` : ''}
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Your Sushma Elementa</p>
            </div>
        </div>
    </body>
    </html>
`;
// pawan.gilhotra@gmail.com
    const mailOptions = {
        from: 'surender82905@gmail.com',
        to: "pawan.gilhotra@gmail.com",
        subject: `New Form Entry for ${data?.event}`,
        html: emailContent,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
