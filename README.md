# AI Career Mentor Assistant

A React-based web assistant that helps users explore careers using OpenAI GPT-4. Users input their interests or skills, and the assistant responds with detailed suggestions and learning paths. Built with React, OpenAI API, and styled with TailwindCSS.

## 🚀 Features

- **AI-Powered Career Guidance**: Get personalized career advice using OpenAI's GPT API
- **Interactive Chat Interface**: Clean, modern UI with real-time responses
- **Learning Roadmaps**: Structured learning paths with clear steps
- **Copy & Download**: Save responses for later reference
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Loading States**: Smooth user experience with loading indicators

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express
- **AI Integration**: OpenAI GPT-3.5/4 API
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-career-mentor
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

1. Open your browser and navigate to `http://localhost:3000` (dev) or `http://localhost:5000` (production)
2. Enter your skills, interests, or career questions in the text area
3. Click "Ask Mentor" or press Enter
4. Receive personalized career guidance and learning paths
5. Copy or download responses for future reference

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
ai-career-mentor/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with title
│   │   ├── CareerMentor.jsx    # Main chat interface
│   │   ├── InputForm.jsx       # User input form
│   │   ├── ChatMessage.jsx     # Individual message display
│   │   └── Footer.jsx          # App footer
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── server.js                   # Express backend server
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
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
  "response": "Based on your interest in design and technology..."
}
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component-specific styles are in each component file

### AI Prompts
- Edit the system prompt in `server.js` to change AI behavior
- Adjust `max_tokens` and `temperature` for different response styles

### Features
- Add new components in `src/components/`
- Extend the chat functionality in `CareerMentor.jsx`
- Add new API endpoints in `server.js`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Heroku
1. Add `"engines": { "node": "18.x" }` to package.json
2. Deploy using Heroku CLI or GitHub integration

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

---

**Built with ❤️ by Bisrat Tadesse** 