const { insertOrUpdateRow, deleteRowFromDB } = require('../models/sheetDataModel');
const { updateGoogleSheet } = require('../services/googleSheetsClient');

// Add/Update data for testing
const addTestData = async (req, res) => {
  try {
    const { sheetName, row, rowData } = req.body;

    if (!sheetName || !row || !rowData) {
      return res.status(400).json({ error: 'sheetName, row, and rowData are required' });
    }

    if (!Array.isArray(rowData)) {
      return res.status(400).json({ error: 'rowData must be an array' });
    }

    // Insert/update in database
    await insertOrUpdateRow({
      sheetName,
      row,
      rowData
    });

    // Also update Google Sheets directly (since notification listener doesn't work in serverless)
    console.log('🔄 Attempting to update Google Sheet after database insert...');
    console.log('📊 Data to sync:', { sheetName, row, rowData });
    
    try {
      const result = await updateGoogleSheet(sheetName, row, rowData);
      if (result) {
        console.log('✅ SUCCESS: Google Sheet updated after database insert');
        console.log('Updated range:', result.data.updatedRange);
      } else {
        console.warn('⚠️ WARNING: updateGoogleSheet returned no result');
      }
    } catch (sheetsError) {
      console.error('❌ FAILED: Error updating Google Sheets:', sheetsError.message);
      console.error('Error code:', sheetsError.code);
      console.error('Error details:', {
        message: sheetsError.message,
        code: sheetsError.code,
        sheetName,
        row,
        rowDataLength: rowData ? rowData.length : 0
      });
      // Don't fail the request if Google Sheets update fails, but log it clearly
      // The database update already succeeded, so we return success
    }

    res.status(200).json({ 
      message: 'Data added/updated successfully',
      data: { sheetName, row, rowData }
    });
  } catch (err) {
    console.error('Error adding test data:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

// Delete data for testing
const deleteTestData = async (req, res) => {
  try {
    const { sheetName, row } = req.body;

    if (!sheetName || !row) {
      return res.status(400).json({ error: 'sheetName and row are required' });
    }

    // Delete from database
    await deleteRowFromDB({ sheetName, row });

    // Also clear the row in Google Sheets
    try {
      await updateGoogleSheet(sheetName, row, []); // Empty array clears the row
      console.log('Google Sheet row cleared successfully');
    } catch (sheetsError) {
      console.error('Error clearing Google Sheets row (non-fatal):', sheetsError);
      // Don't fail the request if Google Sheets update fails
    }

    res.status(200).json({ 
      message: 'Data deleted successfully',
      data: { sheetName, row }
    });
  } catch (err) {
    console.error('Error deleting test data:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

// Get sheet info
const getSheetInfo = async (req, res) => {
  try {
    const sheetId = process.env.SPREADSHEET_ID || 'Not configured';
    res.status(200).json({ sheetId });
  } catch (err) {
    console.error('Error getting sheet info:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addTestData, deleteTestData, getSheetInfo };
