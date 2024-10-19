const { sendToGoogleSheet } = require('./googleSheetsService');
const { SushmaElementaEnquiry, SushmaGroupEnquiry } = require('../models');

const processWebsites = async () => {
  try {
      await sendToGoogleSheet(SushmaGroupEnquiry, 'SushmaGroup');
      await sendToGoogleSheet(SushmaElementaEnquiry, 'SushmaElementa');
  } catch (error) {
    console.error('Error processing websites:', error);
  }
};

module.exports = {
  processWebsites
};
