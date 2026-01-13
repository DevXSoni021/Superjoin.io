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
    console.log('🔄 updateGoogleSheet called with:', {
      sheetName,
      rowNum,
      rowData: rowData ? rowData.slice(0, 3) : 'empty',
      rowDataLength: rowData ? rowData.length : 0
    });

    // Check if credentials are valid
    if (!credentials || !credentials.client_email || !credentials.private_key) {
      const errorMsg = 'Google Sheets credentials not configured. Skipping update.';
      console.error('❌', errorMsg);
      console.error('Credentials check:', {
        hasCredentials: !!credentials,
        hasEmail: !!(credentials && credentials.client_email),
        hasKey: !!(credentials && credentials.private_key),
        envVarExists: !!process.env.GOOGLE_SHEETS_CREDENTIALS
      });
      throw new Error(errorMsg);
    }

    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      const errorMsg = 'SPREADSHEET_ID not set. Skipping Google Sheets update.';
      console.error('❌', errorMsg);
      throw new Error(errorMsg);
    }

    console.log('✅ Credentials and spreadsheet ID validated');

    const client = await sheetsClient();
    console.log('✅ Google Sheets client authenticated');
    
    // Ensure rowData is an array and process it
    let values;
    if (!rowData || rowData.length === 0) {
      console.log('Clearing row (deletion)');
      values = [Array(10).fill('')];
    } else {
      // Ensure it's an array and convert all values to strings
      const processedData = Array.isArray(rowData) 
        ? rowData.map(val => val !== null && val !== undefined ? String(val) : '')
        : [String(rowData)];
      values = [processedData];
      console.log('📝 Data to write:', processedData);
    }
    
    const range = `${sheetName}!A${rowNum}:Z${rowNum}`;
    console.log('📋 Updating range:', range);

    const request = {
      auth: client,
      spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values,
      },
    };

    console.log('🚀 Sending request to Google Sheets API...');
    const response = await sheets.spreadsheets.values.update(request);
    
    console.log('✅ Google Sheet updated successfully!', {
      sheet: sheetName,
      row: rowNum,
      updatedCells: response.data.updatedCells,
      updatedRange: response.data.updatedRange,
      updatedRows: response.data.updatedRows
    });
    
    return response;
  } catch (err) {
    console.error('❌ Error updating Google Sheet:', err.message);
    console.error('Full error:', {
      code: err.code,
      message: err.message,
      stack: err.stack?.split('\n').slice(0, 3).join('\n'),
      sheetName,
      rowNum,
      rowData: rowData ? rowData.slice(0, 3) : 'empty'
    });
    throw err;
  }
};

module.exports = { updateGoogleSheet };
