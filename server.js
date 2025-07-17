const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

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

**Digital Marketing Designer**
- Create visual content for marketing campaigns
- Average salary: $60,000 - $90,000
- Blend of creativity and analytics

📚 **Required Skills:**
• Figma, Adobe Creative Suite
• HTML, CSS, JavaScript
• User research and testing
• Prototyping tools
• Understanding of user psychology

🛣️ **Learning Roadmap:**
1. **Month 1-2:** Learn design fundamentals (color theory, typography, layout)
2. **Month 3-4:** Master design tools (Figma, Sketch, Adobe XD)
3. **Month 5-6:** Learn basic coding (HTML, CSS, JavaScript)
4. **Month 7-8:** Build portfolio projects
5. **Month 9-10:** Learn user research and testing
6. **Month 11-12:** Apply for internships or entry-level positions

📖 **Resources & Next Steps:**
• **Courses:** Udemy, Coursera, Skillshare
• **Communities:** Dribbble, Behance, Designer News
• **Practice:** Daily UI challenges, redesign existing apps
• **Networking:** Attend design meetups, join online communities

💡 **Pro Tip:** Start with UI/UX design as it's the perfect blend of your interests and has excellent career prospects!`
  }
  
  if (lowerInput.includes('html') || lowerInput.includes('css') || lowerInput.includes('python')) {
    return `💻 **Career Suggestions for HTML, CSS & Python Skills:**

**Full-Stack Web Developer**
- Build complete web applications
- Average salary: $80,000 - $130,000
- High demand across all industries

**Frontend Developer**
- Focus on user interface and experience
- Average salary: $75,000 - $110,000
- Perfect for your HTML/CSS skills

**Backend Developer**
- Build server-side applications and APIs
- Average salary: $85,000 - $120,000
- Great for Python expertise

**Data Analyst**
- Analyze data and create insights
- Average salary: $70,000 - $100,000
- Python is essential for data work

📚 **Required Skills:**
• JavaScript (React, Vue, or Angular)
• Python frameworks (Django, Flask)
• Database management (SQL, MongoDB)
• Version control (Git)
• API development

🛣️ **Learning Roadmap:**
1. **Month 1-2:** Master JavaScript fundamentals
2. **Month 3-4:** Learn a frontend framework (React recommended)
3. **Month 5-6:** Study Python web frameworks (Django/Flask)
4. **Month 7-8:** Learn database design and SQL
5. **Month 9-10:** Build full-stack projects
6. **Month 11-12:** Deploy projects and apply for jobs

📖 **Resources & Next Steps:**
• **JavaScript:** freeCodeCamp, MDN Web Docs
• **React:** React documentation, Scrimba
• **Python:** Real Python, Python.org tutorials
• **Projects:** Build a portfolio website, create a web app
• **Networking:** GitHub, Stack Overflow, local meetups

💡 **Pro Tip:** Focus on becoming a full-stack developer - it's the most versatile and in-demand role!`
  }
  
  if (lowerInput.includes('data science') || lowerInput.includes('data')) {
    return `📊 **Career Suggestions for Data Science:**

**Data Scientist**
- Analyze complex data and build predictive models
- Average salary: $100,000 - $150,000
- One of the highest-paying tech roles

**Data Analyst**
- Transform data into actionable insights
- Average salary: $70,000 - $100,000
- Great entry point into data careers

**Machine Learning Engineer**
- Build and deploy ML models
- Average salary: $110,000 - $160,000
- Advanced role with high demand

**Business Intelligence Analyst**
- Create reports and dashboards
- Average salary: $75,000 - $110,000
- Bridge between data and business

📚 **Required Skills:**
• Python (pandas, numpy, scikit-learn)
• SQL for database queries
• Statistics and mathematics
• Data visualization (Tableau, Power BI)
• Machine learning algorithms

🛣️ **Learning Roadmap:**
1. **Month 1-2:** Master Python fundamentals
2. **Month 3-4:** Learn data manipulation (pandas, numpy)
3. **Month 5-6:** Study statistics and probability
4. **Month 7-8:** Learn SQL and database management
5. **Month 9-10:** Master data visualization
6. **Month 11-12:** Learn machine learning basics

📖 **Resources & Next Steps:**
• **Python:** DataCamp, Coursera, edX
• **Statistics:** Khan Academy, Statistics.com
• **Projects:** Kaggle competitions, personal data projects
• **Networking:** Data science meetups, LinkedIn groups
• **Certifications:** Google Data Analytics, IBM Data Science

💡 **Pro Tip:** Start with data analysis roles to build experience before moving into data science!`
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
5. **Continuous Learning:** Stay updated with industry trends

**Popular Career Paths to Consider:**
• Software Development
• Digital Marketing
• Project Management
• Sales and Business Development
• Creative Design
• Data Analysis
• Customer Success
• Product Management

**Next Steps:**
• Research specific roles that interest you
• Learn relevant skills through online courses
• Build a portfolio of projects
• Network with professionals in your target field
• Consider certifications or advanced education

💡 **Pro Tip:** The best career path is one that aligns with your interests, skills, and values while offering growth opportunities!`
}

// Middleware
app.use(cors())
app.use(express.json())

// Build frontend in production if dist doesn't exist
if (process.env.NODE_ENV === 'production' && !fs.existsSync(path.join(__dirname, 'dist'))) {
  try {
    console.log('Building frontend for production...')
    execSync('npm run build', { stdio: 'inherit' })
    console.log('Frontend build completed')
  } catch (error) {
    console.error('Failed to build frontend:', error)
  }
}

// Serve static files from the dist directory (after build)
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static('dist'))
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Career Mentor API is running' })
})

// OpenAI API endpoint
app.post('/api/career-guidance', async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

        // TODO: Add your OpenAI API key here or use environment variable
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
    
    // Check if OpenAI API key is configured
    if (!OPENAI_API_KEY) {
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
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html')
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.status(404).json({ error: 'Frontend not built. Please build the React app first.' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Career Mentor API available at http://localhost:${PORT}/api/career-guidance`)
  console.log(`🌐 Frontend available at http://localhost:${PORT}`)
}) 