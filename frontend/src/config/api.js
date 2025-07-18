// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://your-railway-app-name.railway.app' // Replace with your actual Railway URL
    : 'http://localhost:5001')

export const API_ENDPOINTS = {
  careerGuidance: `${API_BASE_URL}/api/career-guidance`,
  health: `${API_BASE_URL}/api/health`,
  test: `${API_BASE_URL}/api/test`
}

export default API_BASE_URL 