# AI Career Mentor Assistant

A React-based web assistant that helps users explore careers using OpenAI GPT-4. Users input their interests or skills, and the assistant responds with detailed suggestions and learning paths. Built with React, OpenAI API, and styled with TailwindCSS.

## 🌐 Live Application

**Access the application here**: [https://bisrat-career-mentor.netlify.app/](https://bisrat-career-mentor.netlify.app/)

## 🚀 Features

- **AI-Powered Career Guidance**: Get personalized career advice using OpenAI's GPT API
- **Interactive Chat Interface**: Clean, modern UI with real-time responses
- **Learning Roadmaps**: Structured learning paths with clear steps
- **Copy & Download**: Save responses for later reference
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Loading States**: Smooth user experience with loading indicators
- **Smart Fallback System**: Demo responses when AI is unavailable

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite (Deployed on Vercel)
- **Backend**: Node.js with Express (Deployed on Railway)
- **AI Integration**: OpenAI GPT-3.5/4 API
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bisoul1984/AI-Powered-Career-Mentor-Assistant.git
   cd AI-Powered-Career-Mentor-Assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=5000
   ```

4. **Get your OpenAI API key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env` file

## 🚀 Running the Application

### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```
This starts both the React dev server (port 3000) and the Express backend (port 5000).

### Development Mode (Frontend Only)
```bash
npm run dev
```
Starts only the React development server.

### Production Mode
```bash
npm run start
```
Builds the React app and starts the production server.

## 📱 Usage

1. **Live Application**: Visit [https://bisrat-career-mentor.netlify.app/](https://bisrat-career-mentor.netlify.app/)
2. **Local Development**: Open your browser and navigate to `http://localhost:3000` (dev) or `http://localhost:5000` (production)
3. Enter your skills, interests, or career questions in the text area
4. Click "Ask Mentor" or press Enter
5. Receive personalized career guidance and learning paths
6. Copy or download responses for future reference

### Example Questions to Try:
- "I like design and technology, what careers should I consider?"
- "What can I do with HTML, CSS, and Python skills?"
- "I'm interested in data science, what should I learn next?"
- "How can I transition from marketing to software development?"

## 🎥 Demo Video Script

### (0:00–0:20) – Quick Intro
"Hi, I'm Bisrat Tadesse. In this video, I'll walk you through an AI-powered Career Mentor app I built using OpenAI's API with React."

### (0:20–1:00) – Use Case
"The goal is to help users get career guidance by simply describing their interests or skills. The AI responds with tailored career suggestions."

### (1:00–2:30) – Live Demo
- Type an input and submit
- Show the API call (briefly show code)
- Display response and explain how it's generated

### (2:30–3:30) – Code Tour
- Show where you integrate the OpenAI API
- Briefly show useState, fetch, rendering logic
- Emphasize async handling and modular structure

### (3:30–End) – Wrap-Up
"This project shows how I integrate AI into real-world tools with clean UI and responsive UX. I'm excited about what AI can unlock in app development."

## 📁 Project Structure

```
AI-Powered-Career-Mentor-Assistant/
├── frontend/                    # Vercel deployment
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # App header with title
│   │   │   ├── CareerMentor.jsx    # Main chat interface
│   │   │   ├── InputForm.jsx       # User input form
│   │   │   ├── ChatMessage.jsx     # Individual message display
│   │   │   └── Footer.jsx          # App footer
│   │   ├── config/
│   │   │   └── api.js              # API configuration
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── vercel.json                 # Vercel configuration
├── backend/                       # Railway deployment
│   ├── server.js                   # Express backend server
│   ├── package.json                # Backend dependencies
│   └── railway.json                # Railway configuration
├── package.json                    # Root dependencies
└── README.md                       # This file
```

## 🔧 API Endpoints

### POST `/api/career-guidance`
Sends user input to OpenAI and returns career guidance.

**Request Body:**
```json
{
  "message": "I like design and technology"
}
```

**Response:**
```json
{
  "response": "Based on your interest in design and technology...",
  "note": "Using demo mode. AI responses will be available once rate limits are resolved."
}
```

## 🚀 Deployment

### Frontend (Netlify)
- **URL**: [https://bisrat-career-mentor.netlify.app/](https://bisrat-career-mentor.netlify.app/)
- **Framework**: Vite + React
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend (Railway)
- **URL**: [https://ai-powered-career-mentor-assistant-production.up.railway.app/](https://ai-powered-career-mentor-assistant-production.up.railway.app/)
- **Framework**: Node.js + Express
- **Environment**: Production with OpenAI API integration

## 🎨 Customization

### Styling
- Modify `frontend/tailwind.config.js` for theme customization
- Update `frontend/src/index.css` for global styles
- Component-specific styles are in each component file

### AI Prompts
- Edit the system prompt in `backend/server.js` to change AI behavior
- Adjust `max_tokens` and `temperature` for different response styles

### Features
- Add new components in `frontend/src/components/`
- Extend the chat functionality in `CareerMentor.jsx`
- Add new API endpoints in `backend/server.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- React team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vercel for frontend hosting
- Railway for backend hosting

---

**Built with ❤️ by [Bisrat Tadesse](https://www.bisrat-tadesse.com)**

**🌐 Live Application**: [https://bisrat-career-mentor.netlify.app/](https://bisrat-career-mentor.netlify.app/) 