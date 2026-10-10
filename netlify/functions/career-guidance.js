// Netlify wrapper around the shared handler in api/career-guidance.js
// (the same handler also runs as a Vercel function).
const handler = require('../../api/career-guidance.js')

exports.handler = async (event) => {
  let body = {}
  try {
    body = event.body ? JSON.parse(event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8') : event.body) : {}
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  return new Promise((resolve) => {
    const headers = { 'Content-Type': 'application/json' }
    const res = {
      statusCode: 200,
      setHeader (k, v) { headers[k] = v },
      status (code) { this.statusCode = code; return this },
      json (obj) { resolve({ statusCode: this.statusCode, headers, body: JSON.stringify(obj) }) },
      end () { resolve({ statusCode: this.statusCode, headers, body: '' }) }
    }
    Promise.resolve(handler({ method: event.httpMethod, body, headers: event.headers }, res))
      .catch((err) => {
        console.error(err)
        resolve({ statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) })
      })
  })
}
