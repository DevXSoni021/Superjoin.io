// Quick test script to verify database and Google Sheets configuration
require('dotenv').config();
const pool = require('./src/config/database');
const { google } = require('googleapis');
const path = require('path');

async function testConnections() {
  console.log('🧪 Testing configurations...\n');

  // Test Database Connection
  console.log('1️⃣ Testing PostgreSQL connection...');
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connection successful!');
    console.log('   Current time:', result.rows[0].now);
  } catch (err) {
    console.log('❌ Database connection failed:', err.message);
  }

  // Test Google Sheets Credentials
  console.log('\n2️⃣ Testing Google Sheets credentials...');
  try {
    const credentials = require(path.join(__dirname, 'src/config/googleSheetsCredentials.json'));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const client = await auth.getClient();
    console.log('✅ Google Sheets credentials loaded successfully!');
    console.log('   Service account:', credentials.client_email);
  } catch (err) {
    console.log('❌ Google Sheets credentials error:', err.message);
  }

  // Check Environment Variables
  console.log('\n3️⃣ Checking environment variables...');
  const requiredVars = ['DATABASE_URL', 'PORT'];
  const optionalVars = ['SPREADSHEET_ID'];
  
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: Set`);
    } else {
      console.log(`❌ ${varName}: Missing (required)`);
    }
  });

  optionalVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: Set`);
    } else {
      console.log(`⚠️  ${varName}: Not set (optional, but needed for Google Sheets sync)`);
    }
  });

  console.log('\n✨ Test complete!');
  process.exit(0);
}

testConnections();
