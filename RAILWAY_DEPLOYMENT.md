# 🚂 Railway.app Deployment Guide (FREE!)

## ✅ Why Railway?

- **Free Tier Available** - $5 free credit monthly
- **Easy Deployment** - Connect GitHub and deploy
- **Auto-Deploy** - Deploys on every git push
- **No Credit Card Required** (for free tier)

## 🚀 Step-by-Step Deployment

### Step 1: Sign Up / Login

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `DevXSoni021/Superjoin.io`
4. Railway will automatically detect it's a Node.js project

### Step 3: Configure Environment Variables

1. Click on your service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add:

#### Variable 1: DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** 
```
postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### Variable 2: SPREADSHEET_ID
- **Name:** `SPREADSHEET_ID`
- **Value:**
```
1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM
```

### Step 4: Configure Settings (Optional)

1. Go to **"Settings"** tab
2. **Start Command:** Should auto-detect as `npm start` (verify it's correct)
3. **Build Command:** Should auto-detect as `npm install` (verify it's correct)

### Step 5: Deploy

1. Railway will automatically start deploying
2. Wait 2-3 minutes
3. Your app will be live!

### Step 6: Get Your Live URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"** (free)
4. You'll get a URL like: `https://supersync-production.up.railway.app`

## 📋 Quick Reference

| Setting | Value |
|---------|-------|
| Platform | Railway.app |
| Repository | DevXSoni021/Superjoin.io |
| Build Command | `npm install` (auto-detected) |
| Start Command | `npm start` (auto-detected) |
| DATABASE_URL | `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| SPREADSHEET_ID | `1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM` |

## ✅ After Deployment

1. **Update Google Apps Script:**
   - Open `extensions/google-app-script.js`
   - Replace the URL with your Railway URL
   - Example: `https://supersync-production.up.railway.app`

2. **Share Google Sheet:**
   - Add service account: `assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com`
   - Give "Editor" permissions

3. **Test Your Live Dashboard:**
   - Visit your Railway URL
   - Test adding data
   - Test editing Google Sheet

## 💰 Railway Free Tier

- **$5 free credit** per month
- Perfect for small projects
- Auto-sleeps after inactivity (wakes on request)
- No credit card required

## 🔄 Auto-Deploy

Railway automatically deploys when you:
- Push to GitHub
- Merge pull requests
- Make commits to main branch

---

**Railway is FREE and perfect for your project! 🎉**
