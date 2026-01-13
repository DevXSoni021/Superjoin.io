const express = require('express');
const { addTestData, deleteTestData, getSheetInfo } = require('../controllers/testController');

const router = express.Router();

// Test endpoints
router.post('/add-data', addTestData);
router.post('/delete-data', deleteTestData);
router.get('/sheet-info', getSheetInfo);

module.exports = router;
