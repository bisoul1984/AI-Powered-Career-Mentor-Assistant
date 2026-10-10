// API configuration for different environments
// Prefer explicit VITE_API_URL, otherwise use current origin in production,
// and fall back to localhost during development. This avoids requests hanging
// against placeholder domains.
const inferBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (typeof window !== 'undefined' && import.meta.env.PROD) return window.location.origin
  return 'http://localhost:5001'
}

const API_BASE_URL = inferBaseUrl()

export const API_ENDPOINTS = {
  careerGuidance: `${API_BASE_URL}/api/career-guidance`,
  health: `${API_BASE_URL}/api/health`,
  test: `${API_BASE_URL}/api/test`
}

export default API_BASE_URL 