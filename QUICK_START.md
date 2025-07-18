# Quick Start Guide

Your AI Career Mentor application has been successfully separated into backend and frontend directories for deployment on Railway and Vercel respectively.

## ✅ What's Been Set Up

### Backend (Railway Ready)
- ✅ `backend/server.js` - API-only server (no frontend serving)
- ✅ `backend/package.json` - Backend dependencies only
- ✅ `backend/railway.json` - Railway configuration
- ✅ CORS configured for frontend integration
- ✅ Health check endpoints
- ✅ Environment variables ready

### Frontend (Vercel Ready)
- ✅ `frontend/src/` - All React components
- ✅ `frontend/package.json` - Frontend dependencies only
- ✅ `frontend/vite.config.js` - Vite configuration
- ✅ `frontend/vercel.json` - Vercel configuration
- ✅ API configuration for Railway backend
- ✅ Environment variables ready

## 🚀 Next Steps

### 1. Deploy Backend to Railway
```bash
# Navigate to backend
cd backend

# Test locally (optional)
npm start
```

**Railway Deployment:**
1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub
3. Set root directory to `backend`
4. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: `production`
5. Deploy and copy the Railway URL

### 2. Deploy Frontend to Vercel
```bash
# Navigate to frontend
cd frontend

# Test locally (optional)
npm run dev
```

**Vercel Deployment:**
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL
5. Deploy

### 3. Connect Frontend to Backend
1. Update `frontend/src/config/api.js` with your Railway URL
2. Add `FRONTEND_URL` environment variable in Railway with your Vercel URL
3. Redeploy both services

## 📁 Current Structure
```
AI-Powered Career/
├── backend/          # Deploy to Railway
│   ├── server.js     # API server
│   ├── package.json  # Backend deps
│   └── railway.json  # Railway config
├── frontend/         # Deploy to Vercel
│   ├── src/          # React app
│   ├── package.json  # Frontend deps
│   └── vercel.json   # Vercel config
└── DEPLOYMENT_GUIDE.md  # Detailed guide
```

## 🔧 Local Development

### Backend Only
```bash
cd backend
npm install
npm start
# API runs on http://localhost:5001
```

### Frontend Only
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### Both (Two Terminals)
```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run dev
```

## 🌐 API Endpoints
- Health Check: `GET /api/health`
- Career Guidance: `POST /api/career-guidance`
- Test: `GET /api/test`

## 📝 Environment Variables

### Railway (Backend)
```env
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Vercel (Frontend)
```env
VITE_API_URL=https://your-railway-app-name.railway.app
```

## 🎯 Ready to Deploy!

Your application is now properly separated and ready for deployment. Follow the detailed guide in `DEPLOYMENT_GUIDE.md` for step-by-step instructions. 