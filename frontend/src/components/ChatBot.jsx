import { useState, useRef, useEffect } from 'react'

const API_URL = 'https://ai-agent-backend-ddni.onrender.com'

function escHtml(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function formatText(text) {
  return escHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}

function ChatBot({ isOpen, onClose, isDayMode, onToggleDayMode }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messagesRef = useRef([])

  messagesRef.current = messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 400)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !initialized) {
      setInitialized(true)
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const greeting = "Hello! I'm CareerCopilot, your RecruitME consultant. 👋\n\nAre you an **employer** looking to hire top talent, or a **candidate** exploring new opportunities?\n\nEither way, I'm here to help — and remember, our service is always free for candidates!"
        setMessages([{ role: 'assistant', content: greeting }])
        setShowQuickReplies(false)
      }, 1200)
    }
  }, [isOpen, initialized])

  const sendMessage = async (text) => {
    const msg = text || input
    if (!msg.trim() || isTyping) return

    setShowQuickReplies(false)
    const userMsg = { role: 'user', content: msg.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messagesRef.current, userMsg] }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Server error')
      }

      const data = await res.json()
      setIsTyping(false)
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having a little trouble connecting right now. Please email us directly at **contact@recruitME-dubai.com** or call **+971 4 400 0000** — we'd love to help! 🙏"
      }])
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSend = () => sendMessage()

  return (
    <>
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-avatar">A</div>
          <div className="chat-header-info">
            <div className="chat-header-name">CareerCopilot — RecruitME AI</div>
            <div className="chat-header-status">● Online now</div>
          </div>
          <button className="chat-header-day-toggle" onClick={onToggleDayMode} aria-label="Toggle day mode">
            {isDayMode ? '☀️' : '🌙'}
          </button>
          <button className="chat-close" onClick={onClose}>✕</button>
        </div>

        {isOpen && (
          <div className="data-stream" aria-hidden="true">
            <div className="data-stream-bar" />
          </div>
        )}

        <div className="chat-messages">
          {messages.length === 0 && !isTyping && (
            <div className="welcome-msg">
              <div className="msg-wrapper bot">
                <div className="msg-avatar-sm">A</div>
                <div className="bubble bot">
                  Press <strong>Ctrl+Shift+C</strong> or click the chat button anytime to start a conversation with CareerCopilot!
                </div>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrapper ${msg.role}`}>
              <div className="msg-avatar-sm">{msg.role === 'assistant' ? 'A' : 'U'}</div>
              <div
                className={`bubble ${msg.role}`}
                dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
              />
            </div>
          ))}
          {isTyping && (
            <div className="msg-wrapper bot">
              <div className="msg-avatar-sm">A</div>
              <div className="bubble bot typing-indicator">
                <div className="dot" /><div className="dot" /><div className="dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showQuickReplies && (
          <div className="quick-replies">
            <button className="qr-btn" onClick={() => sendMessage("I want to hire talent")}>Hire Talent</button>
            <button className="qr-btn" onClick={() => sendMessage("I'm looking for a job")}>Find a Job</button>
            <button className="qr-btn" onClick={() => sendMessage("Tell me about pricing")}>Pricing</button>
          </div>
        )}

        <div className="chat-input-area">
          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Type a message…"
              rows="1"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="chat-send" onClick={handleSend} disabled={isTyping || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="chat-footer-note">Powered by RecruitME AI · Groq LLaMA 3.3</div>
        </div>
      </div>
    </>
  )
}

export default ChatBot
