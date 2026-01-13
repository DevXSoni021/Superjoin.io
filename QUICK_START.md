# ⚡ Quick Start Guide

## ✅ What's Been Done

1. ✅ Database configuration updated to support PostgreSQL connection string
2. ✅ Setup scripts and deployment files created
3. ✅ Ready for deployment

## 🎯 Next Steps (Choose One)

### Option 1: Run Locally First (Recommended)

1. **Create `.env` file** in the root directory:
   ```bash
   echo 'DATABASE_URL=postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   PORT=3000
   SPREADSHEET_ID=your-google-sheet-id-here' > .env
   ```
   
   **Note**: Replace `your-google-sheet-id-here` with your Google Sheet ID from the URL.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the project**:
   ```bash
   npm start
   ```

4. **Test it**:
   - Server runs on: `http://localhost:3000`
   - Test endpoint: `curl http://localhost:3000/api/dashboard`

### Option 2: Deploy Directly (Fastest for Live Link)

**For Render.com (Recommended - Free):**

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [render.com](https://render.com) → New Web Service
3. Connect GitHub repo
4. Add environment variable:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
5. Deploy! Get your live URL in 2-3 minutes

**See `DEPLOYMENT.md` for detailed steps**

## 📋 Files Created

- `SETUP.md` - Complete setup instructions
- `DEPLOYMENT.md` - Deployment guide for hosting
- `render.yaml` - Render.com configuration
- `Procfile` - Heroku/Railway configuration
- `setup.sh` - Automated setup script

## 🔗 Your Live URL

Once deployed, you'll get a URL like:
- Render: `https://supersync.onrender.com`
- Railway: `https://your-app.up.railway.app`

Share this with your mentor! 🎉

## 🆘 Need Help?

- Check `SETUP.md` for detailed setup
- Check `DEPLOYMENT.md` for hosting options
- Check deployment logs if something fails
