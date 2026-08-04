import { useState, useEffect, useCallback } from 'react'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [isDayMode, setIsDayMode] = useState(false)

  const toggleChat = useCallback(() => {
    setChatOpen(prev => !prev)
  }, [])

  const toggleDayMode = useCallback(() => {
    setIsDayMode(prev => !prev)
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
        e.preventDefault()
        toggleChat()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggleChat])

  return (
    <div className={`app ${isDayMode ? 'day' : ''}`}>
      <div className="bg" />
      <div className="grid-overlay" />
      <div className="scanline" />
      <div className="particle" style={{ left: '10%', animationDuration: '18s', animationDelay: '0s' }} />
      <div className="particle" style={{ left: '25%', animationDuration: '22s', animationDelay: '-5s' }} />
      <div className="particle" style={{ left: '50%', animationDuration: '20s', animationDelay: '-10s' }} />
      <div className="particle" style={{ left: '75%', animationDuration: '24s', animationDelay: '-3s' }} />
      <div className="particle" style={{ left: '90%', animationDuration: '19s', animationDelay: '-8s' }} />
      <div className="glow-ring glow-ring-1" />
      <div className="glow-ring glow-ring-2" />
      <div className="glow-ring glow-ring-3" />
      <div className={`hint-container ${chatOpen ? 'hint-hidden' : ''}`}>
        <span className="hint-text">To activate or chat with agent</span>
        <div className="hint-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
      <button className="chat-trigger" onClick={toggleChat} aria-label="Toggle chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="shortcut-hint">Ctrl+Shift+C</span>
      </button>
      <ChatBot isOpen={chatOpen} onClose={toggleChat} isDayMode={isDayMode} onToggleDayMode={toggleDayMode} />
    </div>
  )
}

export default App
