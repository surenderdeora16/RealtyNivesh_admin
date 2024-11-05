const { MailtrapClient } = require("mailtrap")

const sendEmail = async (data, Emailcount, WebsiteName) => {
    const client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

    if (!client) {
        console.error("Mailtrap client initialization failed.");
        return;
    }

    const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${WebsiteName} Enquiry</title>
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
            <h1>New Lead For ${WebsiteName}</h1>
            ${data?.name ? `<p><span class="label">Name:</span> ${data.name}</p>` : ''}
            ${data?.mobile ? `<p><span class="label">Mobile:</span> ${data.mobile}</p>` : ''}
            ${data?.email ? `<p><span class="label">Email:</span> ${data.email}</p>` : ''}
            ${data?.city ? `<p><span class="label">City:</span> ${data.city}</p>` : ''}
            ${data?.message || data?.projectName || data?.siteVisitDate || data?.preferredHomeSize || data?.broker || data?.howHeardAboutUs ? `
                    <div class="highlight">
                    ${data?.projectName ? `<p><span class="label">Site Name:</span> ${data.projectName}</p>` : ''}
                    ${data?.siteVisitDate ? `<p><span class="label">Site Visit Date:</span> ${data.siteVisitDate}</p>` : ''}
                    ${data?.preferredHomeSize ? `<p><span class="label">Preferred Home Size:</span> ${data.preferredHomeSize}</p>` : ''}
                    ${data?.broker ? `<p><span class="label">Broker:</span> ${data.broker}</p>` : ''}
                    ${data?.howHeardAboutUs ? `<p><span class="label">How Heard About Us:</span> ${data.howHeardAboutUs}</p>` : ''}
                    ${data?.message ? `<p><span class="label">Message:</span> ${data.message}</p>` : ''}
                    </div>
                ` : ''}
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} ${WebsiteName}</p>
            </div>
        </div>
    </body>
    </html>
`;
    
    (async () => {
        try {
            const response = await client.send({
                from: { name: WebsiteName, email: process.env.MAILTRAP_SENDER_EMAIL },
                to: [{ name: process.env.MAILTRAP_RECIPIENT_NAME, email: process.env.MAILTRAP_RECIPIENT_EMAIL }],
                subject: `New Form Entry ${Emailcount > 0 ? `#${Emailcount}` : ''} for ${data?.event}`,
                html: emailContent
            });

            console.log(response)
        } catch (error) {
            console.error(error)
        }

    })()

};

module.exports = sendEmail;
