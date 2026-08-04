import { useState, useEffect, useCallback } from 'react'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [isDayMode, setIsDayMode] = useState(false)
  const [showCTA, setShowCTA] = useState(true)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  const toggleChat = useCallback(() => {
    setChatOpen(prev => !prev)
  }, [])

  const toggleDayMode = useCallback(() => {
    setIsDayMode(prev => !prev)
  }, [])

  const startChat = useCallback(() => {
    setShowCTA(false)
    setTimeout(() => setChatOpen(true), 300)
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setShowCTA(!chatOpen)
  }, [chatOpen])

  const shouldShowHero = showCTA && (!isMobile || !chatOpen)

  return (
    <div className={`app ${isDayMode ? 'day' : ''}`}>
      <div className="bg" />
      <div className="grid-overlay" />
      <div className="scanline" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="particle" style={{ left: '10%', animationDuration: '18s', animationDelay: '0s' }} />
      <div className="particle" style={{ left: '30%', animationDuration: '22s', animationDelay: '-6s' }} />
      <div className="particle" style={{ left: '55%', animationDuration: '20s', animationDelay: '-2s' }} />
      <div className="particle" style={{ left: '78%', animationDuration: '24s', animationDelay: '-10s' }} />
      <div className="particle" style={{ left: '92%', animationDuration: '19s', animationDelay: '-14s' }} />
      <div className="particle" style={{ left: '5%', animationDuration: '26s', animationDelay: '-3s', width: '4px', height: '4px', opacity: '0.6' }} />
      <div className="particle" style={{ left: '25%', animationDuration: '17s', animationDelay: '-8s', width: '3px', height: '3px' }} />
      <div className="particle" style={{ left: '45%', animationDuration: '21s', animationDelay: '-1s', width: '4px', height: '4px', opacity: '0.5' }} />
      <div className="particle" style={{ left: '68%', animationDuration: '23s', animationDelay: '-12s', width: '3px', height: '3px' }} />
      <div className="particle" style={{ left: '85%', animationDuration: '20s', animationDelay: '-5s', width: '4px', height: '4px', opacity: '0.55' }} />

      <div className={`hero ${shouldShowHero ? '' : 'hero-hidden'}`}>
        <div className="hero-card">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-text">AI-Powered Career Intelligence</span>
          </div>
          <h1 className="hero-title">CareerCopilot</h1>
          <p className="hero-tagline">Your smart career companion for hiring, recruiting, and career growth.</p>
          <div className="hero-actions">
            <button className="cta-main" onClick={startChat}>
              <span className="cta-text">Start the Bot</span>
              <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <div className="hero-pill-row">
              <span className="hero-pill">Free for candidates</span>
              <span className="hero-pill">Instant guidance</span>
            </div>
          </div>
          <p className="hero-hint">or press Ctrl+Shift+C</p>
        </div>
      </div>

      <button className={`chat-trigger ${showCTA ? 'trigger-hidden' : ''}`} onClick={toggleChat} aria-label="Open chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="trigger-ring" />
      </button>

      <button className="day-toggle" onClick={toggleDayMode} aria-label="Toggle day mode">
        {isDayMode ? '☀️' : '🌙'}
      </button>

      <ChatBot isOpen={chatOpen} onClose={() => { setChatOpen(false) }} isDayMode={isDayMode} />
    </div>
  )
}

export default App