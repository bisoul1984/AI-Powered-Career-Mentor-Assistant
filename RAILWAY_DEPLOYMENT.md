# Railway Deployment Guide

## Prerequisites
1. A Railway account (free tier available)
2. Your OpenAI API key (optional - app works with demo responses)

## Step 1: Prepare Your Repository
Your project is already configured for Railway deployment with:
- `railway.json` - Railway configuration
- `server.js` - Express server that serves both API and frontend
- `package.json` - Proper build and start scripts

## Step 2: Deploy to Railway

### Option A: Deploy via Railway Dashboard
1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repository
4. Railway will automatically detect the configuration and start building

### Option B: Deploy via Railway CLI
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

## Step 3: Configure Environment Variables
In your Railway project dashboard:
1. Go to "Variables" tab
2. Add the following variables:
   ```
   OPENAI_API_KEY=your-actual-openai-api-key
   NODE_ENV=production
   ```

## Step 4: Get Your Deployment URL
1. Railway will provide a URL like: `https://your-app-name.railway.app`
2. Your app will be available at this URL
3. API endpoints:
   - Health check: `https://your-app-name.railway.app/api/health`
   - Career guidance: `https://your-app-name.railway.app/api/career-guidance`

## How It Works
- Railway builds your React frontend using `npm run build`
- The Express server serves the built frontend files
- API endpoints are handled by the same server
- Everything runs on one Railway service

## Troubleshooting
- If the build fails, check the Railway logs
- Make sure all dependencies are in `package.json`
- The app works with demo responses even without OpenAI API key

## Custom Domain (Optional)
1. In Railway dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed by Railway 