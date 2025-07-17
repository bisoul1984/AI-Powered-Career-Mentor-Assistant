// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? window.location.origin // Use the same domain as the frontend
  : 'http://localhost:5001'

export const API_ENDPOINTS = {
  careerGuidance: `${API_BASE_URL}/api/career-guidance`,
  health: `${API_BASE_URL}/api/health`,
  test: `${API_BASE_URL}/api/test`
}

export default API_BASE_URL 