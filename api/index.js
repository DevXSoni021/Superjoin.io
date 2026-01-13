// Vercel serverless function entry point
let app;

try {
  app = require('../src/app');
} catch (error) {
  console.error('Error loading app:', error);
  app = null;
}

// Export as Vercel serverless function
module.exports = async (req, res) => {
  try {
    if (!app) {
      app = require('../src/app');
    }
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
};
