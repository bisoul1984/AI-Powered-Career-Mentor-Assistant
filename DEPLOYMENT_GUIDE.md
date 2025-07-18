# Deployment Guide: Railway (Backend) + Vercel (Frontend)

This guide will help you deploy your AI Career Mentor application with the backend on Railway and the frontend on Vercel.

## Project Structure

```
AI-Powered Career/
├── backend/          # Railway deployment
│   ├── server.js
│   ├── package.json
│   ├── railway.json
│   └── env.example
└── frontend/         # Vercel deployment
    ├── src/
    ├── package.json
    ├── vite.config.js
    ├── vercel.json
    └── env.example
```

## Step 1: Deploy Backend to Railway

### 1.1 Prepare Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Test locally:
   ```bash
   npm start
   ```

### 1.2 Deploy to Railway
1. Go to [Railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set the root directory to `backend`
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your Vercel frontend URL (add this after frontend deployment)

### 1.3 Get Railway URL
1. After deployment, go to your Railway project
2. Click on your service
3. Copy the generated URL (e.g., `https://your-app-name.railway.app`)

## Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API URL:
   - Edit `src/config/api.js`
   - Replace `your-railway-app-name.railway.app` with your actual Railway URL

4. Test locally:
   ```bash
   npm run dev
   ```

### 2.2 Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and sign in
2. Click "New Project" → "Import Git Repository"
3. Select your repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_API_URL`: Your Railway backend URL

### 2.3 Update Backend CORS
1. Go back to Railway dashboard
2. Add environment variable:
   - `FRONTEND_URL`: Your Vercel frontend URL

## Step 3: Test Your Deployment

### 3.1 Test Backend API
```bash
# Health check
curl https://your-railway-app-name.railway.app/api/health

# Test career guidance
curl -X POST https://your-railway-app-name.railway.app/api/career-guidance \
  -H "Content-Type: application/json" \
  -d '{"message": "I want to become a web developer"}'
```

### 3.2 Test Frontend
1. Visit your Vercel URL
2. Try sending a message to test the connection with the backend

## Environment Variables

### Backend (Railway)
```env
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-railway-app-name.railway.app
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in Railway
   - Check that the frontend URL matches exactly

2. **API Connection Issues**
   - Verify the Railway URL is correct in frontend config
   - Check that the backend is running and healthy

3. **Build Failures**
   - Ensure all dependencies are installed
   - Check for syntax errors in code

4. **Environment Variables**
   - Make sure all required environment variables are set
   - Restart deployments after adding new variables

### Health Checks
- Backend: `https://your-railway-app-name.railway.app/api/health`
- Frontend: Your Vercel URL should load the React app

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Full Stack (both running)
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## URLs Summary

- **Backend API**: `https://your-railway-app-name.railway.app`
- **Frontend App**: `https://your-vercel-app.vercel.app`
- **API Endpoints**:
  - Health: `/api/health`
  - Career Guidance: `/api/career-guidance`
  - Test: `/api/test`

## Next Steps

1. Set up custom domains (optional)
2. Configure monitoring and logging
3. Set up CI/CD pipelines
4. Add database integration if needed
5. Implement authentication if required 