const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const path = require('path');
const sheetRoutes = require('./routes/googleSheetsRoutes');
const { createSheetTable } = require('./models/sheetDataModel');
const { listenForNotifications } = require('./utils/dbNotificationListener'); // Import the listener
const errorHandler = require('./middlewares/errorHandler');
const dashboardRoutes = require('./routes/dashboardRoutes');
const testRoutes = require('./routes/testRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/sheets', sheetRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/test', testRoutes);

// Serve dashboard on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Initialize database table (lazy initialization for Vercel)
let tableInitialized = false;
const initializeTable = async () => {
  if (!tableInitialized) {
    try {
      await createSheetTable();
      tableInitialized = true;
    } catch (error) {
      console.error('Error initializing table:', error);
    }
  }
};

// Middleware to ensure table is initialized
app.use(async (req, res, next) => {
  if (!tableInitialized) {
    await initializeTable();
  }
  next();
});

// Start the app (only if not in Vercel serverless environment)
if (process.env.VERCEL !== '1' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await createSheetTable(); // Ensure the table exists
    listenForNotifications(); // Start listening to notifications (only works in non-serverless)
  });
} else {
  // For Vercel/serverless: Don't start listening to notifications
  // Persistent connections don't work in serverless environments
  // Database triggers will still work, but we can't listen in real-time
  console.log('Running in serverless mode - notification listener disabled');
}

// Export for Vercel
module.exports = app;
