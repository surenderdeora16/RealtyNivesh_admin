// require('dotenv').config();
// const { google } = require('googleapis');
// const readline = require('readline');

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const getAuthUrl = () => {
//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/spreadsheets'],
//   });
//   console.log('Authorize this app by visiting this URL:', authUrl);
// };

// const getAccessToken = () => {
//   rl.question('Enter the code from that page here: ', async (code) => {
//     try {
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
//       console.log('Access token and refresh token:', tokens);
//     } catch (error) {
//       console.error('Error retrieving access token:', error);
//     }
//     rl.close();
//   });
// };

// getAuthUrl();
// getAccessToken();
