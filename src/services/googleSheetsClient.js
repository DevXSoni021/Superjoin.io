const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Load Google Sheets credentials from file or environment variable
let credentials = null;
let credentialsLoaded = false;

// Function to load credentials (can be called multiple times)
const loadCredentials = () => {
  // If we already have valid credentials, return them
  if (credentials && credentials.client_email && credentials.private_key) {
    return credentials;
  }

  // Reset if we had a failed load attempt
  if (credentialsLoaded && !credentials) {
    console.log('🔄 Retrying to load credentials...');
    credentialsLoaded = false;
  }

  console.log('🔄 Loading Google Sheets credentials...');
  
  // Try to load from file first (for local development)
  const credentialsPath = path.join(__dirname, '../config/googleSheetsCredentials.json');
  if (fs.existsSync(credentialsPath)) {
    try {
      credentials = require(credentialsPath);
      console.log('✅ Credentials loaded from file');
      credentialsLoaded = true;
      return credentials;
    } catch (error) {
      console.warn('⚠️ Could not load credentials from file:', error.message);
    }
  }

  // If file doesn't exist, try to load from environment variable (for Vercel/serverless)
  if (process.env.GOOGLE_SHEETS_CREDENTIALS) {
    try {
      const envCreds = process.env.GOOGLE_SHEETS_CREDENTIALS;
      console.log('📦 Found GOOGLE_SHEETS_CREDENTIALS in environment, parsing...');
      credentials = JSON.parse(envCreds);
      
      // Validate credentials
      if (credentials && credentials.client_email && credentials.private_key) {
        console.log('✅ Credentials loaded from environment variable');
        console.log('📧 Service account:', credentials.client_email);
        credentialsLoaded = true;
        return credentials;
      } else {
        console.error('❌ Credentials from environment are incomplete');
        credentials = null;
      }
    } catch (error) {
      console.error('❌ Error parsing GOOGLE_SHEETS_CREDENTIALS:', error.message);
      credentials = null;
    }
  } else {
    console.warn('⚠️ GOOGLE_SHEETS_CREDENTIALS environment variable not found');
  }

  // If still no credentials, return null (don't create fake ones)
  if (!credentials) {
    console.error('❌ Google Sheets credentials not found. Google Sheets sync will not work.');
    console.error('💡 Make sure GOOGLE_SHEETS_CREDENTIALS is set in Vercel environment variables');
    credentialsLoaded = true; // Mark as loaded so we don't keep trying
    return null;
  }

  credentialsLoaded = true;
  return credentials;
};

// Load credentials on module load
credentials = loadCredentials();

const sheets = google.sheets('v4');

// Create auth client (will be recreated with valid credentials when needed)
let auth = null;
let sheetsClientInstance = null;

const getAuthClient = () => {
  const currentCredentials = loadCredentials();
  if (!currentCredentials) {
    throw new Error('Cannot create auth client: credentials not available');
  }
  
  // Always create fresh auth with current credentials (safer for serverless)
  auth = new google.auth.GoogleAuth({
    credentials: currentCredentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  return auth;
};

const sheetsClient = async () => {
  const authClient = getAuthClient();
  return await authClient.getClient();
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

    // Reload credentials (in case they were set after module load in serverless)
    const currentCredentials = loadCredentials();

    // Check if credentials are valid
    if (!currentCredentials || !currentCredentials.client_email || !currentCredentials.private_key) {
      const errorMsg = 'Google Sheets credentials not configured. Cannot update Google Sheets.';
      console.error('❌', errorMsg);
      console.error('Credentials check:', {
        hasCredentials: !!currentCredentials,
        hasEmail: !!(currentCredentials && currentCredentials.client_email),
        hasKey: !!(currentCredentials && currentCredentials.private_key),
        envVarExists: !!process.env.GOOGLE_SHEETS_CREDENTIALS,
        envVarLength: process.env.GOOGLE_SHEETS_CREDENTIALS ? process.env.GOOGLE_SHEETS_CREDENTIALS.length : 0
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
