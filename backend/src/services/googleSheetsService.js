const moment = require('moment/moment');
const sheets = require('../config/googleSheetsConfig');

const spreadsheetId = process.env.SPREADSHEET_ID;

// Find or create a sheet with a specific title
const findOrCreateSheet = async (title) => {
    try {
        const response = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetsInfo = response.data.sheets;

        const existingSheet = sheetsInfo.find(sheet => sheet.properties.title === title);
        if (existingSheet) {
            return existingSheet.properties.sheetId;
        } else {
            const newSheetResponse = await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: {
                    requests: [
                        { addSheet: { properties: { title } } }
                    ]
                }
            });
            return newSheetResponse.data.replies[0].addSheet.properties.sheetId;
        }
    } catch (error) {
        throw new Error(`Error finding or creating sheet: ${error.message}`);
    }
};

// Send data to a specific Google Sheets tab
const sendToGoogleSheet = async (model, sheetName) => {
    try {

        const enquiries = await model.find({
            googleSheetStatus: { $ne: true },
            createdAt: { $lte: moment().subtract(15, 'minutes').toDate() }
        });

        if (enquiries.length > 0) {
            let values;
            if (model.modelName === 'SushmaGroup_Enquiry') {
                values = enquiries.map(enquiry => {
                    const formattedDate = enquiry.createdAt
                        ? `${enquiry.createdAt.getDate()}/${enquiry.createdAt.getMonth() + 1}/${enquiry.createdAt.getFullYear()}`
                        : '-';

                    const formattedSiteVisitDate = enquiry.siteVisitDate
                        ? `${enquiry.siteVisitDate.getDate()}/${enquiry.siteVisitDate.getMonth() + 1}/${enquiry.siteVisitDate.getFullYear()}`
                        : '-';
                    return [
                        formattedDate,
                        enquiry.name || '-',
                        enquiry.mobile || '-',
                        enquiry.email || '-',
                        enquiry.projectName || '-',
                        formattedSiteVisitDate || '-',
                        enquiry.message || '-',
                        enquiry.otpStatus || '-',
                        enquiry.event || '-'
                    ];
                });
            } else if (model.modelName === 'SushmaElementa_Enquiry' || 'Medallion_Enquiry') {
                values = enquiries.map(enquiry => {
                    const formattedDate = enquiry.createdAt
                        ? `${enquiry.createdAt.getDate()}/${enquiry.createdAt.getMonth() + 1}/${enquiry.createdAt.getFullYear()}`
                        : '-';

                    const formattedSiteVisitDate = enquiry.siteVisitDate
                        ? `${enquiry.siteVisitDate.getDate()}/${enquiry.siteVisitDate.getMonth() + 1}/${enquiry.siteVisitDate.getFullYear()}`
                        : '-';

                    return [
                        formattedDate,
                        enquiry.name || '-',
                        enquiry.mobile || '-',
                        enquiry.email || '-',
                        formattedSiteVisitDate || '-',
                        enquiry.city || '-',
                        enquiry.preferredHomeSize || '-',
                        enquiry.broker || '-',
                        enquiry.howHeardAboutUs || '-',
                        enquiry.message || '-',
                        enquiry.otpStatus || '-',
                        enquiry.event || '-'
                    ];
                });
            }

            const sheetId = await findOrCreateSheet(sheetName);
            console.log('sheetId', sheetId)
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${sheetName}!A1`,
                valueInputOption: 'RAW',
                resource: { values }
            });

            const enquiryIds = enquiries.map(enquiry => enquiry._id);
            console.log('enquiryIds', enquiryIds)
            await model.updateMany({ _id: { $in: enquiryIds } }, { googleSheetStatus: true });

            console.log(`Data sent to ${sheetName} tab and googleSheetStatus updated.`);
        }
    } catch (error) {
        console.error(`Error sending data to ${sheetName} tab:`, error);
    }
};


module.exports = {
    sendToGoogleSheet
};
