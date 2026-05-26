import { useState, useEffect, useCallback } from 'react'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  const toggleChat = useCallback(() => {
    setChatOpen(prev => !prev)
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
    <div className="app">
      <div className="bg" />
      <button className="chat-trigger" onClick={toggleChat} aria-label="Toggle chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="shortcut-hint">Ctrl+Shift+C</span>
      </button>
      <ChatBot isOpen={chatOpen} onClose={toggleChat} />
    </div>
  )
}

export default App
