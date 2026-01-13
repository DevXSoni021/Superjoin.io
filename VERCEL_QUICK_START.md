# ⚡ Vercel Quick Start Guide

## 🚀 Deploy in 3 Steps

### Step 1: Go to Vercel
Visit [vercel.com](https://vercel.com) and sign up/login with GitHub

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find: `DevXSoni021/Superjoin.io`
3. Click **"Import"**

### Step 3: Add Environment Variables
Click **"Environment Variables"** and add:

**DATABASE_URL:**
```
postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**SPREADSHEET_ID:**
```
1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM
```

Then click **"Deploy"**!

## ✅ That's It!

Your app will be live at: `https://your-app.vercel.app`

## 📋 What's Configured

✅ `vercel.json` - Vercel configuration file  
✅ `api/index.js` - Serverless function entry point  
✅ `src/app.js` - Updated for Vercel compatibility  
✅ All files pushed to GitHub  

## 🎯 Next Steps

1. **Update Google Apps Script** with your Vercel URL
2. **Share Google Sheet** with service account
3. **Test your dashboard!**

See `VERCEL_DEPLOYMENT.md` for detailed instructions.
