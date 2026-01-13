# Setup Instructions

## Step 1: Create .env file

Create a `.env` file in the root directory with the following content:

```
DATABASE_URL=postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=3000
SPREADSHEET_ID=your-google-sheet-id-here
```

**Note**: Replace `your-google-sheet-id-here` with your actual Google Sheet ID (found in the Google Sheet URL).

## Step 2: Install Dependencies

Run the following command in your terminal:

```bash
npm install
```

## Step 3: Run the Project

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`

## Step 4: Hosting Options

### Option A: Render (Recommended - Free Tier Available)

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: supersync
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `DATABASE_URL`: `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
     - `PORT`: `3000` (Render will set this automatically, but you can specify)
5. Click "Create Web Service"
6. Your app will be live at: `https://supersync.onrender.com` (or your custom domain)

### Option B: Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variable:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
5. Railway will automatically detect Node.js and deploy
6. Your app will be live at: `https://your-app-name.up.railway.app`

### Option C: Heroku

1. Install Heroku CLI: `brew install heroku/brew/heroku` (Mac) or visit [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variable: `heroku config:set DATABASE_URL=postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
5. Deploy: `git push heroku main`
6. Your app will be live at: `https://your-app-name.herokuapp.com`

## API Endpoints

Once running, your API will be available at:

- `GET /api/dashboard` - Dashboard data
- `POST /api/sheets/sync` - Sync Google Sheets data
- `GET /api/sheets/data` - Get synced data

## Testing Locally

After starting the server, test it:

```bash
curl http://localhost:3000/api/dashboard
```
