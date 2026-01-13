# 🚀 Fly.io Deployment Guide (FREE - Always On!)

## ✅ Why Fly.io?

- **Free Tier:** 3 shared-cpu-1x VMs (always-on!)
- **No Sleep:** Apps stay running 24/7
- **Global Edge Network:** Fast worldwide
- **Great Performance:** Production-ready

## 🚀 Step-by-Step Deployment

### Step 1: Install Fly CLI

**Mac:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

### Step 2: Sign Up / Login

```bash
fly auth signup
# Or if you have an account:
fly auth login
```

### Step 3: Create Fly App

In your project directory:
```bash
cd "/Users/devashishsoni/Downloads/SuperSync-main 2"
fly launch
```

Follow the prompts:
- App name: `supersync` (or choose your own)
- Region: Choose closest to you
- PostgreSQL: No (we're using Neon)
- Redis: No

### Step 4: Create fly.toml Configuration

Create or update `fly.toml`:

```toml
app = "supersync"
primary_region = "iad"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

### Step 5: Set Environment Variables

```bash
fly secrets set DATABASE_URL="postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

fly secrets set SPREADSHEET_ID="1DzVBnjlYbmZg8XyPXNAELjmxTNMVXhzsWb5n8OnmSPM"
```

### Step 6: Deploy

```bash
fly deploy
```

### Step 7: Get Your URL

```bash
fly open
```

Or check your app URL in the dashboard: `https://fly.io/apps`

## 📋 Configuration Files

### Dockerfile (if needed)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### fly.toml

```toml
app = "supersync"
primary_region = "iad"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

## ✅ After Deployment

1. **Update Google Apps Script** with your Fly.io URL
2. **Share Google Sheet** with service account
3. **Test your dashboard** at your Fly.io URL

## 💰 Fly.io Free Tier

- **3 shared-cpu-1x VMs** free
- **Always-on** (no sleep!)
- **256MB RAM** per VM
- **3GB storage** per VM

---

**Fly.io gives you always-on hosting for FREE! 🎉**
