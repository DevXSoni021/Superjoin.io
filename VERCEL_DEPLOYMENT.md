# ▲ Vercel Deployment Guide

## ✅ Why Vercel?

- **100% FREE** - Generous free tier
- **Auto-Deploy** - Deploys on every git push
- **Global CDN** - Fast worldwide
- **Easy Setup** - Connect GitHub and deploy
- **No Credit Card Required**

## 🚀 Step-by-Step Deployment

### Step 1: Sign Up / Login

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended)
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `DevXSoni021/Superjoin.io`
3. Click **"Import"**

### Step 3: Configure Project

Vercel will auto-detect your settings, but verify:

**Framework Preset:** `Other` (or leave as auto-detected)

**Root Directory:** (Leave empty - not needed)

**Build Command:** (Leave empty - Vercel will handle it)

**Output Directory:** (Leave empty)

**Install Command:** `npm install`

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

#### Variable 1: DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** 
```
postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
- **Environment:** Select all (Production, Preview, Development)

#### Variable 2: SPREADSHEET_ID
- **Name:** `SPREADSHEET_ID`
- **Value:**
```
1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM
```
- **Environment:** Select all (Production, Preview, Development)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Your app will be live!

### Step 6: Get Your Live URL

After deployment, Vercel will provide you with:
- **Production URL:** `https://superjoin-io.vercel.app` (or your custom name)
- **Preview URLs:** For each branch/PR

## 📋 Configuration Files

### vercel.json
This file is already created in your project root with the correct configuration.

### Important Notes for Vercel

1. **Serverless Functions:** Vercel uses serverless functions, so your app is optimized for this
2. **Static Files:** Your `public/` folder is automatically served
3. **API Routes:** All `/api/*` routes work automatically
4. **Auto-Deploy:** Every push to GitHub triggers a new deployment

## ✅ After Deployment

1. **Update Google Apps Script:**
   - Open `extensions/google-app-script.js`
   - Replace the URL with your Vercel URL
   - Example: `https://superjoin-io.vercel.app`

2. **Share Google Sheet:**
   - Add service account: `assignment-1@gen-lang-client-0724675556.iam.gserviceaccount.com`
   - Give "Editor" permissions

3. **Test Your Live Dashboard:**
   - Visit your Vercel URL
   - Test adding data
   - Test editing Google Sheet

## 🔄 Auto-Deploy

Vercel automatically deploys when you:
- Push to main branch (Production)
- Push to other branches (Preview)
- Open pull requests (Preview)

## 📊 Vercel Free Tier

- **100GB bandwidth** per month
- **100 serverless function invocations** per day
- **Unlimited deployments**
- **Global CDN**
- **SSL certificates** (automatic)

## 🆘 Troubleshooting

### If deployment fails:

1. **Check Build Logs:** Click on your deployment → "Logs"
2. **Verify Environment Variables:** Make sure all are set correctly
3. **Check vercel.json:** Ensure configuration is correct

### If API routes don't work:

- Make sure `vercel.json` is in the root directory
- Check that routes are configured correctly
- Verify environment variables are set

### Database connection issues:

- Verify `DATABASE_URL` is set correctly
- Check that SSL is enabled in connection string
- Ensure database allows connections from Vercel IPs

## 📝 Quick Reference

| Setting | Value |
|---------|-------|
| Platform | Vercel |
| Repository | DevXSoni021/Superjoin.io |
| Framework | Other/Node.js |
| Build Command | (Auto) |
| Install Command | `npm install` |
| DATABASE_URL | `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| SPREADSHEET_ID | `1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM` |

## 🎯 Next Steps

1. **Push to GitHub** (if not already done)
2. **Deploy on Vercel** using the steps above
3. **Update Google Apps Script** with your Vercel URL
4. **Test your live dashboard!**

---

**Vercel is FREE and perfect for your project! 🎉**
