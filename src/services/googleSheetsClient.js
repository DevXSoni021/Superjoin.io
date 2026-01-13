const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Load Google Sheets credentials from file or environment variable
let credentials;

// Try to load from file first (for local development)
const credentialsPath = path.join(__dirname, '../config/googleSheetsCredentials.json');
if (fs.existsSync(credentialsPath)) {
  try {
    credentials = require(credentialsPath);
  } catch (error) {
    console.warn('Could not load credentials from file:', error.message);
  }
}

// If file doesn't exist, try to load from environment variable (for Vercel/serverless)
if (!credentials && process.env.GOOGLE_SHEETS_CREDENTIALS) {
  try {
    credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
  } catch (error) {
    console.error('Error parsing GOOGLE_SHEETS_CREDENTIALS from environment:', error.message);
  }
}

// If still no credentials, create a minimal one (will fail on actual API calls but won't crash)
if (!credentials) {
  console.warn('Google Sheets credentials not found. Some features may not work.');
  credentials = {
    type: 'service_account',
    project_id: '',
    private_key_id: '',
    private_key: '',
    client_email: '',
    client_id: '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: '',
    universe_domain: 'googleapis.com'
  };
}

const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheetsClient = async () => {
  return await auth.getClient();
};

// Function to update a row in Google Sheets
const updateGoogleSheet = async (sheetName, rowNum, rowData) => {
  try {
    // Check if credentials are valid
    if (!credentials || !credentials.client_email || !credentials.private_key) {
      console.warn('Google Sheets credentials not configured. Skipping update.');
      return;
    }

    const client = await sheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID; // Ensure this is set in your .env file

    if (!spreadsheetId) {
      console.warn('SPREADSHEET_ID not set. Skipping Google Sheets update.');
      return;
    }

    const request = {
      auth: client,
      spreadsheetId,
      range: `${sheetName}!A${rowNum + 1}:Z${rowNum + 1}`, // The row to update
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    };

    const response = await sheets.spreadsheets.values.update(request);
    console.log('Google Sheet updated:', response.data);
  } catch (err) {
    console.error('Error updating Google Sheet:', err);
    // Don't throw - just log the error so the app doesn't crash
  }
};

module.exports = { updateGoogleSheet };
