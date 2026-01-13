# 🔑 Add Google Sheets Credentials to Vercel

## ⚠️ Important

The Google Sheets credentials file is not deployed (for security). You need to add it as an environment variable in Vercel.

## 📋 Step-by-Step Instructions

### Step 1: Get Your Credentials JSON

Your credentials are in `src/config/googleSheetsCredentials.json`. Copy the entire JSON content.

### Step 2: Convert to Single Line

The JSON needs to be on a single line for the environment variable. 

**Option A: Using Command Line (Recommended)**
```bash
# On your local machine, run:
cat src/config/googleSheetsCredentials.json | jq -c .
```

**Option B: Manual Conversion**
1. Open `src/config/googleSheetsCredentials.json` in your local project
2. Copy the entire JSON content
3. Remove all line breaks and extra spaces
4. Make it a single line

**Option C: Use Online Tool**
- Use a JSON minifier like jsonformatter.org
- Paste your JSON and minify it
- Copy the result

### Step 3: Add to Vercel

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Click **"+ Add New"**
4. **Name:** `GOOGLE_SHEETS_CREDENTIALS`
5. **Value:** Paste the entire JSON string from Step 2 (the single line)
6. **Environment:** Select all (Production, Preview, Development)
7. Click **"Save"**

### Step 4: Redeploy

After adding the environment variable:
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

## ✅ Verify

After redeploying, your app should work! The credentials will be loaded from the environment variable.

## 🔒 Security Note

- The credentials file is in `.gitignore` (not committed to GitHub)
- Credentials are stored securely in Vercel's environment variables
- Only you and Vercel can see these values

---

**After adding the environment variable and redeploying, your app will work! 🎉**
