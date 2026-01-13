# 🔍 Debugging Database → Google Sheets Sync

## ✅ What Was Improved

1. **Better Error Logging** - More detailed error messages
2. **Row Clearing** - Properly clears rows when deleting
3. **Credential Validation** - Better checks for credentials

## 🧪 How to Test

### Test Adding Data:
1. Go to dashboard: https://superjoin-kv983q88n-devas-projects-2ba5a1aa.vercel.app
2. Use "Add/Update Data" form:
   - Sheet Name: `Sheet1` (or your actual sheet name)
   - Row Number: `1`
   - Row Data: `John Doe, 25, New York`
   - Click "Add/Update Data"
3. **Check your Google Sheet** - Should update immediately

### Check Vercel Logs:
1. Go to Vercel Dashboard
2. Your Project → Deployments → Latest
3. Click "View Function Logs"
4. Look for:
   - `✅ Google Sheet updated successfully` - Success!
   - `❌ Error updating Google Sheet` - Error (check details)

## 🔍 Common Issues & Fixes

### Issue 1: "Google Sheets credentials not configured"
**Fix:**
- Go to Vercel → Settings → Environment Variables
- Add `GOOGLE_SHEETS_CREDENTIALS` with the JSON (single line)
- Get it: `cat src/config/googleSheetsCredentials.json | jq -c .`
- Redeploy

### Issue 2: "SPREADSHEET_ID not set"
**Fix:**
- Go to Vercel → Settings → Environment Variables
- Add `SPREADSHEET_ID` = `1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM`
- Redeploy

### Issue 3: "Permission denied" or "The caller does not have permission"
**Fix:**
- Open your Google Sheet
- Click "Share"
- Add: `assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com`
- Give "Editor" permissions
- Click "Send"

### Issue 4: "Sheet not found" or "Unable to parse range"
**Fix:**
- Make sure `Sheet1` exists in your Google Sheet
- Or use the exact sheet name from your Google Sheet
- Check the sheet name matches exactly (case-sensitive)

### Issue 5: Still not working?
**Check Vercel Logs:**
1. Vercel Dashboard → Your Project
2. Deployments → Latest Deployment
3. Click "View Function Logs"
4. Look for error messages
5. Check the error code and message

## 📋 Verification Checklist

- [ ] `GOOGLE_SHEETS_CREDENTIALS` is set in Vercel
- [ ] `SPREADSHEET_ID` is set in Vercel
- [ ] Sheet is shared with service account
- [ ] Service account has "Editor" permissions
- [ ] Sheet name matches exactly (e.g., "Sheet1")
- [ ] Vercel logs show "✅ Google Sheet updated successfully"

## 🎯 Expected Log Messages

**Success:**
```
Attempting to update Google Sheet: { sheetName: 'Sheet1', rowNum: 1, ... }
✅ Google Sheet updated successfully: { updatedCells: 3, updatedRange: 'Sheet1!A1:C1' }
```

**Error:**
```
❌ Error updating Google Sheet: [error message]
Error details: { code: 'PERMISSION_DENIED', ... }
```

---

**Check Vercel logs to see what's happening! 🔍**
