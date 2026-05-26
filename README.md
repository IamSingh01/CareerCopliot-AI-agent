# REcruit AI Sales Bot — Full Stack

A premium recruitment website + AI sales chatbot powered by Groq (LLaMA 3.3 70B).

---

## 🗂 Project Structure

```
recruit-bot/
├── backend/
│   ├── server.js         # Express + Groq API server
│   ├── package.json
│   └── .env.example      # Copy to .env and fill in your key
└── frontend/
    └── index.html        # Full standalone site + chatbot (no build needed)
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

Just open `frontend/index.html` in a browser — no build step needed.

**OR** serve it with a static server:
```bash
cd frontend
npx serve .
```

---

## 🌐 Deploying to Production

### Backend (Railway / Render / Fly.io)

1. Push `backend/` to a GitHub repo
2. Connect to Railway or Render
3. Set environment variable: `GROQ_API_KEY=your_key_here`
4. Deploy — get your URL (e.g. `https://recruit-bot.railway.app`)

### Frontend

In `frontend/index.html`, update line:
```javascript
const API_URL = 'http://localhost:3001/api/chat';
// Change to:
const API_URL = 'https://your-backend-url.railway.app/api/chat';
```

Then host `frontend/index.html` on:
- **Netlify**: drag & drop the file
- **Vercel**: `vercel deploy`
- **GitHub Pages**: push to repo

---

## 🤖 Bot Personality

The bot is **Alex**, a dual-function AI agent:
- **For Employers**: Persuasive sales consultant focused on ROI, speed, and quality
- **For Candidates**: Friendly career advisor (service is 100% free to candidates)

Key business rule: **REcruit only charges employers, never candidates.**

Model: `llama-3.3-70b-versatile` via Groq (extremely fast inference)

---

## ✨ Features

- Dark/Light theme toggle
- Fully responsive (mobile, tablet, desktop)
- Glass morphism UI with gold accents
- Animated background with orbs
- Chat popup with typing indicators
- Quick reply buttons
- Scroll-triggered animations
- 90-day placement guarantee section
- Stats bar, sectors grid, testimonials
- Employer & Candidate split sections

---

## 🔧 Customization

### Change company name / email / phone
Search and replace in `index.html`:
- `REcruit` → Your company name
- `contact@recruit-dubai.com` → Your email
- `+971 4 400 0000` → Your number

### Change bot behavior
Edit `SYSTEM_PROMPT` in `backend/server.js`

### Change colors
Edit CSS variables at the top of `index.html`:
```css
:root {
  --gold: #C9A96E;     /* Primary accent */
  --obsidian: #0A0A0F; /* Background */
}
```
