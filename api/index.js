// Vercel serverless function entry point
const app = require('../src/app');

// Export as Vercel serverless function
module.exports = (req, res) => {
  return app(req, res);
};
