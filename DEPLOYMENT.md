# Deployment Guide

## Current Status
- ✅ **Frontend**: Deployed to Vercel (React app)
- ❌ **Backend**: Still running locally (Node.js/Express server)

## Deploy Backend to Vercel

### Step 1: Deploy Backend
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./` (root)
   - **Build Command**: Leave empty (not needed for API)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### Step 2: Set Environment Variables
1. In your Vercel project settings, go to "Environment Variables"
2. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production, Preview, Development

### Step 3: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://your-project.vercel.app`)

### Step 4: Update Frontend Configuration
1. Open `src/config/api.js`
2. Replace `'https://your-vercel-backend-url.vercel.app'` with your actual backend URL
3. Commit and push changes
4. Redeploy frontend (Vercel will auto-deploy)

## Alternative: Deploy Both Together

If you want to deploy both frontend and backend together:

1. Update `vercel.json` to include frontend build:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

2. Add build script to `package.json`:
```json
{
  "scripts": {
    "build": "vite build",
    "vercel-build": "npm run build"
  }
}
```

## Testing Your Deployment

1. **Test Backend**: Visit `https://your-backend-url.vercel.app/api/health`
2. **Test Frontend**: Visit your frontend URL and try sending a message
3. **Check Console**: Look for any CORS or API errors

## Troubleshooting

### CORS Issues
If you get CORS errors, make sure your backend allows requests from your frontend domain.

### API Key Issues
- Ensure your OpenAI API key is set in Vercel environment variables
- Check that the key is valid and has credits

### Build Issues
- Make sure all dependencies are in `package.json`
- Check that Node.js version is compatible (use Node 18+)

## Final Result
After deployment, you'll have:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **Full App**: Both working together seamlessly 