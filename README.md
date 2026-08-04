# CareerCopilot — AI Agent

A dual-function AI agent powered by Groq (LLaMA 3.3 70B).

---

## 🗂 Project Structure

```
CareerCopilot/
├── backend/
│   ├── server.js         # Express + Groq API server
│   ├── package.json
│   └── .env.example      # Copy to .env and fill in your key
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main React app
    │   ├── App.css       # Styling
    │   └── components/
    │       └── ChatBot.jsx  # Chat interface
    ├── index.html
    └── vite.config.js
```

---

## ⚡ Quick Start

### 1. Get a Groq API Key
1. Go to [console.groq.com](https://console.groq.com)
2. Create a free account
3. Generate an API key

### 2. Backend Setup

```bash
cd backend
npm install

# Create your .env file
cp .env.example .env
# → Edit .env and paste your GROQ_API_KEY

npm start
# Server runs at http://localhost:3001
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## 🤖 Agent Personality

The agent is **Alex**, a dual-function AI:
- **For Employers**: Persuasive sales consultant focused on ROI, speed, and quality
- **For Candidates**: Friendly career advisor (service is 100% free to candidates)

Key business rule: **CareerCopilot only charges employers, never candidates.**

Model: `llama-3.3-70b-versatile` via Groq (extremely fast inference)

---

## ✨ Features

- Dark/Light theme toggle
- Fully responsive chat interface
- Glass morphism UI with gold accents
- Animated background with tech grid, scanlines, and particles
- Chat popup with typing indicators
- Quick reply buttons
- Data stream animation on chat open
- Powered by Groq LLaMA 3.3 70B

---

## 🔧 Customization

### Change agent name / email / phone
Search and replace in `frontend/src/components/ChatBot.jsx`:
- `CareerCopilot` → Your agent name
- `contact@recruit-dubai.com` → Your email
- `+971 4 400 0000` → Your number

### Change agent behavior
Edit `SYSTEM_PROMPT` in `backend/server.js`

### Change colors
Edit CSS variables in `frontend/src/App.css`:
```css
--gold: #C9A96E;     /* Primary accent */
--obsidian: #0A0A0F; /* Background */
```