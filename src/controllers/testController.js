const { insertOrUpdateRow, deleteRowFromDB } = require('../models/sheetDataModel');

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

    await insertOrUpdateRow({
      sheetName,
      row,
      rowData
    });

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

    await deleteRowFromDB({ sheetName, row });

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
