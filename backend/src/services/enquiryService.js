const { sendToGoogleSheet } = require('./googleSheetsService');
const { PinnacleEnquiry, MedallionAurumEnquiry, SushmaElementaEnquiry, SushmaBellezaEnquiry, SushmaGroupEnquiry, MedallionEnquiry } = require('../models');

const processWebsites = async () => {
  try {
    await sendToGoogleSheet(SushmaGroupEnquiry, 'SushmaGroup');
    await sendToGoogleSheet(SushmaElementaEnquiry, 'SushmaElementa');
    await sendToGoogleSheet(SushmaBellezaEnquiry, 'SushmaBelleza');
    await sendToGoogleSheet(MedallionEnquiry, 'Medallion');
    await sendToGoogleSheet(MedallionAurumEnquiry, 'Medallion Aurum');
    await sendToGoogleSheet(PinnacleEnquiry, 'The Pinnacle');

  } catch (error) {
    console.error('Error processing websites:', error);
  }
};

module.exports = {
  processWebsites
};
