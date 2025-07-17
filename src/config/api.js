// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://ai-powered-career-mentor-backend.vercel.app' // Your backend URL (you'll get this after deploying backend)
  : 'http://localhost:5001'

export const API_ENDPOINTS = {
  careerGuidance: `${API_BASE_URL}/api/career-guidance`,
  health: `${API_BASE_URL}/api/health`
}

export default API_BASE_URL 