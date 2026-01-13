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
      console.warn('Credentials check:', {
        hasCredentials: !!credentials,
        hasEmail: !!(credentials && credentials.client_email),
        hasKey: !!(credentials && credentials.private_key)
      });
      return;
    }

    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn('SPREADSHEET_ID not set. Skipping Google Sheets update.');
      return;
    }

    console.log('Attempting to update Google Sheet:', {
      sheetName,
      rowNum,
      rowDataLength: rowData ? rowData.length : 0,
      spreadsheetId
    });

    const client = await sheetsClient();
    
    // Handle empty rowData (for deletion) - clear the row
    let values;
    if (!rowData || rowData.length === 0) {
      // For deletion, we need to clear the row
      // First, get the current row to see how many columns to clear
      try {
        const getRange = `${sheetName}!A${rowNum}:Z${rowNum}`;
        const getResponse = await sheets.spreadsheets.values.get({
          auth: client,
          spreadsheetId,
          range: getRange
        });
        
        const currentRow = getResponse.data.values && getResponse.data.values[0];
        const numColumns = currentRow ? currentRow.length : 10; // Default to 10 columns
        
        // Create empty array with same number of columns
        values = [Array(numColumns).fill('')];
      } catch (getErr) {
        // If we can't get the row, just clear with default columns
        values = [Array(10).fill('')];
      }
    } else {
      values = [rowData];
    }
    
    const request = {
      auth: client,
      spreadsheetId,
      range: `${sheetName}!A${rowNum}:Z${rowNum}`, // The row to update (rowNum is 1-indexed)
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values,
      },
    };

    const response = await sheets.spreadsheets.values.update(request);
    console.log('✅ Google Sheet updated successfully:', {
      sheet: sheetName,
      row: rowNum,
      updatedCells: response.data.updatedCells,
      updatedRange: response.data.updatedRange
    });
    return response;
  } catch (err) {
    console.error('❌ Error updating Google Sheet:', err.message);
    console.error('Error details:', {
      code: err.code,
      message: err.message,
      sheetName,
      rowNum
    });
    // Don't throw - just log the error so the app doesn't crash
    throw err; // Actually throw so we can see the error in logs
  }
};

module.exports = { updateGoogleSheet };
