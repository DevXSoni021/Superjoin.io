# Quick Deployment Guide

## 🚀 Fastest Way to Deploy (Render.com - Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Render

1. **Sign up/Login** at [render.com](https://render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**:
   - **Name**: `supersync` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   - **Key**: `DATABASE_URL`
     **Value**: `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - **Key**: `SPREADSHEET_ID`
     **Value**: `your-google-sheet-id-here` (replace with your actual Google Sheet ID)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your app will be live at: `https://supersync.onrender.com` (or your custom name)

### Step 3: Get Your Live URL
Once deployed, Render will provide you with a URL like:
- `https://supersync.onrender.com`

Share this URL with your mentor! 🎉

---

## Alternative: Railway.app (Also Free)

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variable:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
5. Railway auto-detects Node.js and deploys
6. Get your live URL from Railway dashboard

---

## Testing Your Deployment

Once deployed, test your API:

```bash
# Test dashboard endpoint
curl https://your-app-url.onrender.com/api/dashboard

# Should return JSON response
```

---

## Important Notes

- **Free Tier**: Both Render and Railway offer free tiers (with some limitations)
- **Cold Starts**: Free tier apps may have cold starts (first request takes 30-60 seconds)
- **Auto-Deploy**: Both platforms auto-deploy on git push
- **Logs**: Check deployment logs in the platform dashboard if issues occur

---

## Troubleshooting

### If deployment fails:
1. Check build logs in Render/Railway dashboard
2. Ensure `DATABASE_URL` is set correctly
3. Verify `package.json` has correct start script
4. Check that all dependencies are in `package.json`

### If app doesn't connect to database:
1. Verify `DATABASE_URL` environment variable is set
2. Check Neon database is accessible (not paused)
3. Ensure SSL is enabled (already in connection string)
