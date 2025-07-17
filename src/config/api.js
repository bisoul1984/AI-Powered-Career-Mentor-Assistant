// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://ai-powered-career-mentor-assistant.vercel.app' // Same domain as frontend
  : 'http://localhost:5001'

export const API_ENDPOINTS = {
  careerGuidance: `${API_BASE_URL}/api/career-guidance`,
  health: `${API_BASE_URL}/api/health`
}

export default API_BASE_URL 