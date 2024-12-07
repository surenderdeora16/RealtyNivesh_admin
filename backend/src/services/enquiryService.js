const { sendToGoogleSheet } = require('./googleSheetsService');
const { SushmaElementaEnquiry, SushmaBellezaEnquiry, SushmaGroupEnquiry, MedallionEnquiry } = require('../models');

const processWebsites = async () => {
  try {
    await sendToGoogleSheet(SushmaGroupEnquiry, 'SushmaGroup');
    await sendToGoogleSheet(SushmaElementaEnquiry, 'SushmaElementa');
    await sendToGoogleSheet(SushmaBellezaEnquiry, 'SushmaBelleza');
    await sendToGoogleSheet(MedallionEnquiry, 'Medallion');
  } catch (error) {
    console.error('Error processing websites:', error);
  }
};

module.exports = {
  processWebsites
};
