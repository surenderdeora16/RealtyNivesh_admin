const { sendToGoogleSheet } = require('./googleSheetsService');
const { SushmaElementaEnquiry, SushmaGroupEnquiry, MedallionEnquiry } = require('../models');

const processWebsites = async () => {
  try {
      await sendToGoogleSheet(SushmaGroupEnquiry, 'SushmaGroup');
      await sendToGoogleSheet(SushmaElementaEnquiry, 'SushmaElementa');
      await sendToGoogleSheet(MedallionEnquiry, 'Medallion');
  } catch (error) {
    console.error('Error processing websites:', error);
  }
};

module.exports = {
  processWebsites
};
