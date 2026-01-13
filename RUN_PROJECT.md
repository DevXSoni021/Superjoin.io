# 🚀 How to Run the Project

## Quick Start (3 Steps)

### Step 1: Create .env File

Create a `.env` file in the root directory:

```bash
cat > .env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=3000
SPREADSHEET_ID=your-google-sheet-id-here
EOF
```

**Replace `your-google-sheet-id-here` with your actual Google Sheet ID** (found in the Google Sheet URL).

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Project

```bash
npm start
```

The server will start on `http://localhost:3000`

## ✅ Test Your Setup

Before running, you can test your configuration:

```bash
npm run test-connection
```

This will verify:
- ✅ Database connection
- ✅ Google Sheets credentials
- ✅ Environment variables

## 🧪 Test the API

Once running, test the endpoints:

```bash
# Test dashboard endpoint
curl http://localhost:3000/api/dashboard

# Should return JSON with your synced data
```

## 📋 What's Configured

✅ **Database**: PostgreSQL connection string configured  
✅ **Google Sheets**: Service account credentials set up  
✅ **API Routes**: `/api/sheets` and `/api/dashboard` ready  
✅ **Real-time Sync**: Database triggers and Google Apps Script ready  

## 🔗 Next: Deploy for Live URL

See `DEPLOYMENT.md` for hosting instructions to get your live URL!

## ⚠️ Important Notes

1. **Google Sheet ID**: You need to add your actual Google Sheet ID to `.env`
2. **Share Sheet**: Share your Google Sheet with `assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com`
3. **Apps Script**: Update the URL in `extensions/google-app-script.js` with your live URL after deployment

See `GOOGLE_SHEETS_SETUP.md` for detailed Google Sheets setup.
