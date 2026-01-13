# 🚀 Render.com Deployment Configuration

## 📋 Configuration Details for Render.com

Use these exact settings when setting up your web service on Render:

### 🔧 Basic Settings

**Language:** `Node`

**Branch:** `main`

**Root Directory:** (Leave empty - not needed)

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

### 🔑 Environment Variables

Click **"+ Add Environment Variable"** and add these TWO variables:

#### 1. DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** 
```
postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### 2. SPREADSHEET_ID
- **Name:** `SPREADSHEET_ID`
- **Value:**
```
1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM
```

### 📝 Step-by-Step Instructions

1. **Connect Repository:**
   - Select your GitHub repository: `DevXSoni021/Superjoin.io`
   - Or connect it if not already connected

2. **Configure Service:**
   - **Name:** `supersync` (or any name you prefer)
   - **Language:** Select `Node`
   - **Branch:** `main`
   - **Region:** Choose any (Oregon is fine)

3. **Build & Start:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** Leave empty

4. **Environment Variables:**
   - Click **"+ Add Environment Variable"**
   - Add `DATABASE_URL` with the PostgreSQL connection string
   - Click **"+ Add Environment Variable"** again
   - Add `SPREADSHEET_ID` with your Google Sheet ID

5. **Instance Type:**
   - For free tier: Select the **Free** option (if available)
   - Or select **$7/month** (0.5 CPU) for better performance

6. **Deploy:**
   - Click **"Create Web Service"**
   - Wait 2-3 minutes for deployment

### ✅ After Deployment

Once deployed, you'll get a URL like:
```
https://supersync.onrender.com
```

### 🔄 Next Steps After Deployment

1. **Update Google Apps Script:**
   - Open `extensions/google-app-script.js`
   - Replace `https://your-app.onrender.com` with your actual Render URL
   - Copy the updated script to your Google Sheet's Apps Script editor

2. **Share Google Sheet:**
   - Open your Google Sheet
   - Click "Share"
   - Add: `assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com`
   - Give "Editor" permissions

3. **Test Your Live Dashboard:**
   - Visit: `https://your-app.onrender.com`
   - Test adding data
   - Test editing Google Sheet

### 📊 Quick Reference

| Setting | Value |
|---------|-------|
| Language | Node |
| Branch | main |
| Build Command | `npm install` |
| Start Command | `npm start` |
| DATABASE_URL | `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| SPREADSHEET_ID | `1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM` |

---

**Copy and paste these values directly into Render! 🎉**
