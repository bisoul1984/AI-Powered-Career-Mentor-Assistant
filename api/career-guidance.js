const axios = require('axios')

// Demo response generator
function generateDemoResponse(userInput) {
  const lowerInput = userInput.toLowerCase()
  
  if (lowerInput.includes('design') && lowerInput.includes('technology')) {
    return `🎨 **Career Suggestions for Design + Technology:**

**UI/UX Designer**
- Create user interfaces and experiences for digital products
- Average salary: $85,000 - $120,000
- High demand in tech companies

**Frontend Developer**
- Build interactive websites and web applications
- Average salary: $75,000 - $110,000
- Combines design skills with coding

**Product Designer**
- Design entire product experiences
- Average salary: $90,000 - $130,000
- Strategic role in product development

📚 **Required Skills:**
• Figma, Adobe Creative Suite
• HTML, CSS, JavaScript
• User research and testing
• Prototyping tools

🛣️ **Learning Roadmap:**
1. **Month 1-2:** Learn design fundamentals
2. **Month 3-4:** Master design tools (Figma, Sketch)
3. **Month 5-6:** Learn basic coding (HTML, CSS, JavaScript)
4. **Month 7-8:** Build portfolio projects

💡 **Pro Tip:** Start with UI/UX design as it's the perfect blend of your interests!`
  }
  
  // Default response for any other input
  return `🤖 **AI Career Mentor Response:**

Based on your input: "${userInput}"

I'd be happy to provide personalized career guidance! Here are some general career exploration tips:

**Career Exploration Steps:**
1. **Self-Assessment:** Identify your strengths, interests, and values
2. **Research:** Explore different industries and roles
3. **Network:** Connect with professionals in fields you're interested in
4. **Gain Experience:** Internships, projects, or volunteer work

**Popular Career Paths to Consider:**
• Software Development
• Digital Marketing
• Project Management
• Creative Design
• Data Analysis

💡 **Pro Tip:** The best career path is one that aligns with your interests, skills, and values!`
}

// Free hosting plans stop functions after about 10 seconds, so stop waiting for the AI before that
const AI_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS || 8500)

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    const hasOpenAI = OPENAI_API_KEY && OPENAI_API_KEY !== 'your-openai-api-key-here'

    // No AI key configured: answer with the built-in demo guidance instead of failing
    if (!GEMINI_API_KEY && !hasOpenAI) {
      return res.json({ response: generateDemoResponse(message), mode: 'demo' })
    }

    // Create the prompt for career guidance
    const systemPrompt = `You are an expert career mentor and guidance counselor. Your role is to provide personalized career advice, suggestions, and learning paths based on users' skills, interests, and questions.

When responding, please:
1. Be encouraging and supportive
2. Provide specific career suggestions based on their input
3. Include a learning roadmap with clear steps
4. Mention relevant skills they should develop
5. Suggest resources or courses they can take
6. Keep responses comprehensive but well-structured
7. Use bullet points for better readability

Format your response with clear sections like:
- Career Suggestions
- Required Skills
- Learning Roadmap
- Resources & Next Steps`

    const userPrompt = `User input: "${message}"

Please provide personalized career guidance based on this input.`

    let aiResponse
    if (GEMINI_API_KEY) {
      // Google Gemini (free tier available at https://aistudio.google.com).
      // Try the configured model, then a stable fast model, then Google's auto-updating alias,
      // so the app keeps working when Google retires a model.
      const models = [...new Set([process.env.GEMINI_MODEL, 'gemini-3.5-flash-lite', 'gemini-flash-latest'].filter(Boolean))]
      const deadline = Date.now() + AI_TIMEOUT_MS
      for (const model of models) {
        const timeLeft = deadline - Date.now()
        if (timeLeft < 1000) break
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
              generationConfig: { maxOutputTokens: 1500, temperature: 0.7 }
            },
            {
              headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
              timeout: timeLeft
            }
          )
          const parts = response.data?.candidates?.[0]?.content?.parts || []
          aiResponse = parts.map(p => p.text || '').join('').trim()
          break
        } catch (err) {
          // Model retired or unavailable to this key: try the next one
          if (err.response?.status === 404) { console.warn(`Gemini model ${model} not available`); continue }
          throw err
        }
      }
    } else {
      // OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1000,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: AI_TIMEOUT_MS
        }
      )
      aiResponse = response.data.choices[0].message.content
    }

    if (!aiResponse) {
      return res.json({ response: generateDemoResponse(message), mode: 'demo' })
    }
    res.json({ response: aiResponse, mode: 'ai' })

  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    
    if ([400, 401, 403].includes(error.response?.status)) {
      // Usually a wrong / missing-permission API key. Visitors still get guidance;
      // the site owner sees the real reason in the function logs.
      console.error('AI key problem - check GEMINI_API_KEY / OPENAI_API_KEY:', error.response?.data?.error?.message || error.message)
      return res.json({ response: generateDemoResponse(req.body?.message || ''), mode: 'demo' })
    }

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || /timeout/i.test(error.message || '')) {
      // AI took too long: still give the visitor useful guidance
      return res.json({ response: generateDemoResponse(req.body?.message || ''), mode: 'demo' })
    }

    if (error.response?.status === 429) {
      // Free-tier limit reached: still give the visitor useful guidance
      return res.json({ response: generateDemoResponse(req.body?.message || ''), mode: 'demo' })
    }

    res.status(500).json({ 
      error: 'Failed to get career guidance. Please try again.' 
    })
  }
} 