# Google Sheets Setup Guide

## ✅ Credentials Configured

The Google Sheets service account credentials have been set up in:
- `src/config/googleSheetsCredentials.json`

## 📋 Additional Setup Required

### 1. Get Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Copy the `SHEET_ID_HERE` part

### 2. Share Sheet with Service Account

**IMPORTANT**: You must share your Google Sheet with the service account email:

```
assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com
```

**Steps**:
1. Open your Google Sheet
2. Click "Share" button (top right)
3. Add the email: `assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com`
4. Give it "Editor" permissions
5. Click "Send"

### 3. Add Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Delete any existing code
4. Copy the code from `extensions/google-app-script.js`
5. **Update the URL** in the script:
   - Replace `https://ccf1-182-72-39-9.ngrok-free.app` with your live URL
   - Example: `https://supersync.onrender.com`
6. Save the script
7. Click "Run" → Select `onEditt` → Click "Run"
8. Authorize the script when prompted

### 4. Set Up Environment Variable

Add to your `.env` file:
```
SPREADSHEET_ID=your-google-sheet-id-here
```

Or when deploying, add as environment variable:
- **Key**: `SPREADSHEET_ID`
- **Value**: Your Google Sheet ID

## 🔄 How It Works

1. **Google Sheets → Database**: When you edit a cell in Google Sheets, the Apps Script sends data to your API
2. **Database → Google Sheets**: When data changes in PostgreSQL, triggers notify your app, which updates Google Sheets

## 🧪 Testing

1. Edit a cell in your Google Sheet
2. Check your server logs - you should see the data being received
3. Check your database - the data should be synced
4. Make a direct database change (if possible) - it should update Google Sheets

## ⚠️ Troubleshooting

### "Permission denied" error
- Make sure you shared the sheet with the service account email
- Check that the service account has "Editor" permissions

### "Spreadsheet not found" error
- Verify `SPREADSHEET_ID` is correct in `.env`
- Check the Sheet ID in the URL matches

### Apps Script not triggering
- Make sure you saved the script
- Verify the URL in the script is correct
- Check that `onEditt` function is set up as a trigger (it should auto-trigger on edit)
