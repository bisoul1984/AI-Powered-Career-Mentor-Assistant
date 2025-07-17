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

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    
    // Check if OpenAI API key is configured
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
      // Return a demo response instead of error
      const demoResponse = generateDemoResponse(message)
      return res.json({ response: demoResponse })
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

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
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
        }
      }
    )

    const aiResponse = response.data.choices[0].message.content

    res.json({ response: aiResponse })

  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: 'Invalid OpenAI API key. Please check your configuration.' 
      })
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      })
    }

    res.status(500).json({ 
      error: 'Failed to get career guidance. Please try again.' 
    })
  }
} 